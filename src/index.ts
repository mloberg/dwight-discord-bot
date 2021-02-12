import { Client } from 'discord.js';
import { escapeRegExp, memoize } from 'lodash';

import commands, { Commands } from './commands';
import config from './config';
import { FriendlyError } from './error';
import logger from './logger';
import { Context } from './types';

const client = new Client();
const regex = memoize((commands: Commands, ...prefix: string[]) => {
    const prefixMatch = prefix.join('|');
    const commandMatch = commands.all().map(escapeRegExp).join('|');

    return new RegExp(`^(?:${prefixMatch})\\s*?(?<command>${commandMatch})(?<args>.*)?`, 'i');
});

client.once('ready', () => {
    if (!client.user) {
        return;
    }

    client.user.setActivity(`Assistant to the DM | ${config.prefix}help`);
    logger.info(
        {
            username: `${client.user.username}#${client.user.discriminator} (${client.user.id})`,
            prefix: config.prefix,
        },
        'Client ready',
    );
});

client.on('message', async (message) => {
    if (message.author.bot) {
        return;
    }

    const text = message.content.trim().replace(/\s+/, ' ');
    const match = regex(commands, `<@!?${client.user?.id}>`, escapeRegExp(config.prefix)).exec(text);
    if (!match) {
        return;
    }

    const { command, args = '' } = match.groups || {};
    const handler = commands.get(command.toLowerCase());
    if (!handler) {
        throw new Error(`Could not find handler for ${command}.`);
    }

    const parsedArgs = (handler.args || /.*/).exec(args.trim());
    if (!parsedArgs) {
        logger.debug({ command, args, regex: handler.args }, 'Invalid usage');
        await message.reply(`Usage: ${config.prefix}${handler.name} ${handler.usage}`);
        return;
    }

    const context: Context = {
        command,
        args: args.split(' ').filter((v) => v),
        match: parsedArgs,
        groups: parsedArgs.groups || {},
    };

    logger.debug({
        guild: message.guild?.name,
        channel: message.channel.toString(),
        message: message.content,
        ...context,
    });

    try {
        await handler.run(message, context);
    } catch (err) {
        if (err instanceof FriendlyError) {
            return message.reply(err.message);
        }

        message.reply('That broke me. Check my logs for details.');
        logger.error(err);
    }
});

process.on('unhandledRejection', (reason) => {
    //.throw it and let our exception handler deal with it
    throw reason;
});

process.on('uncaughtException', (err: Error) => {
    logger.error(err);
    process.exit(1);
});

if (config.env !== 'test') {
    client.login(config.token);
}
