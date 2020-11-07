import { Client } from 'discord.js';
import { escapeRegExp } from 'lodash';
import yargs from 'yargs';

import commands from './commands';
import config from './config';
import { FriendlyError } from './error';
import logger from './logger';

const client = new Client();

client.once('ready', () => {
    if (!client.user) {
        return;
    }

    client.user.setActivity(`Assistant to the Dungeon Master | ${config.prefix}help`);
    logger.info(
        {
            username: `${client.user.username}#${client.user.discriminator} (${client.user.id})`,
            prefix: config.prefix,
        },
        'Client ready',
    );
});

client.on('message', async (message) => {
    const prefixRegex = new RegExp(`^(<@!?${client.user?.id}>|${escapeRegExp(config.prefix)})\\s*`);
    if (message.author.bot || !prefixRegex.test(message.content)) {
        return;
    }

    const [, matchedPrefix] = message.content.match(prefixRegex) ?? [];
    const [commandName, ...args] = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const parsed = yargs.help(false).parse(args.join(' '));
    parsed.$0 = commandName;

    const command = commands.get(commandName.toLowerCase());
    if (!command) {
        return;
    }

    logger.debug({
        guild: message.guild?.name,
        channel: message.channel.toString(),
        message: message.content,
        command: commandName,
        args: parsed,
    });

    try {
        await command.run(message, parsed);
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
