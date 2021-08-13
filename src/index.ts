import { Client, Intents } from 'discord.js';

import config from './config';
import { FriendlyError } from './error';
import logger from './logger';
import slash from './slash';

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
