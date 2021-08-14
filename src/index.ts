import { Client, Intents } from 'discord.js';

import commands from './commands';
import config from './config';
import { FriendlyError } from './error';
import logger from './logger';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', async () => {
    client.user?.setActivity(`Assistant to the DM`);
    logger.info(
        {
            id: client.user?.id,
            username: client.user?.username,
            discriminator: client.user?.discriminator,
        },
        'Bot ready',
    );
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const command = commands.get(interaction.commandName);
    if (!command) {
        return;
    }

    try {
        await command.handler(interaction);
        if (!interaction.replied) {
            await interaction.reply(':white_check_mark:');
        }
    } catch (err) {
        const content = err instanceof FriendlyError ? err.message : 'An unknown error occurred.';
        await interaction.reply({ content, ephemeral: true });
        logger.error(err);
    }
});

process.on('unhandledRejection', (reason) => {
    // throw it and let our exception handler deal with it
    throw reason;
});

process.on('uncaughtException', (err: Error) => {
    logger.fatal(err);
    process.exit(1);
});

if (config.env !== 'test') {
    client.login(config.token);
}
