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

    logger.debug({ id: interaction.commandId, command: interaction.commandName, channel: interaction.channelId });

    const command = commands.get(interaction.commandName);
    if (!command) {
        return;
    }

    try {
        await command.handle(interaction);
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply(':white_check_mark:');
        }
    } catch (error) {
        const content = error instanceof FriendlyError ? error.message : 'An unknown error occurred.';
        interaction.deferred
            ? await interaction.followUp({ content, ephemeral: true })
            : await interaction.reply({ content, ephemeral: true });
        logger.error(error as Error);
    }
});

process.on('unhandledRejection', (reason) => {
    // throw it and let our exception handler deal with it
    throw reason;
});

process.on('uncaughtException', (error: Error) => {
    logger.fatal(error);
    process.exit(1); // eslint-disable-line no-process-exit
});

if (config.env !== 'test') {
    client.login(config.token);
}
