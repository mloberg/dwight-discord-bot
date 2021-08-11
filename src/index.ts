import { Client, Intents } from 'discord.js';
import { escapeRegExp, memoize } from 'lodash';

import { Context, Manager } from './command';
import commands from './commands';
import config from './config';
import { FriendlyError } from './error';
import logger from './logger';
import slash from './slash';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const regex = memoize((commands: Manager, ...prefix: string[]) => {
    const prefixMatch = prefix.join('|');
    const commandMatch = commands.all().map(escapeRegExp).join('|');

    return new RegExp(`^(?:${prefixMatch})\\s*?(?<command>${commandMatch})(?<args>.*)?`, 'i');
});

client.once('ready', async () => {
    if (!client.user) {
        return;
    }

    client.user.setActivity(`Assistant to the DM | ${config.prefix}help`);
    logger.info(
        {
            username: `${client.user.username}#${client.user.discriminator} (${client.user.id})`,
            prefix: config.prefix,
        },
        'Bot ready',
    );

    if (config.guildID) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const commands = slash.map(({ run, ...data }) => data);
        await client.guilds.cache.get(config.guildID)?.commands.set(commands);
        logger.info({ commands: commands.map(({ name }) => name), guild: config.guildID }, 'Registered commands');
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const command = slash.get(interaction.commandName);
    if (!command) {
        return;
    }

    try {
        await command.run(interaction);
        if (!interaction.replied) {
            await interaction.reply(':white_check_mark:');
        }
    } catch (err) {
        const content = err instanceof FriendlyError ? err.message : 'An unknown error occurred.';
        await interaction.reply({ content, ephemeral: true });
        logger.error(err);
    }
});

client.on('messageCreate', async (message) => {
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
            await message.reply(err.message);
            return;
        }

        await message.reply('That broke me. Check my logs for details.');
        logger.error(err);
    }
});

process.on('unhandledRejection', (reason) => {
    // throw it and let our exception handler deal with it
    throw reason;
});

process.on('uncaughtException', (err: Error) => {
    logger.error(err);
    process.exit(1);
});

if (config.env !== 'test') {
    client.login(config.token);
}
