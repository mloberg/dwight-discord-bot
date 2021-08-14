import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import commands from '../commands';
import config from '../config';
import logger from '../logger';

const clientID = config.clientID;
if (!clientID) {
    logger.fatal('CLIENT_ID environment variable is required to install application (/) commands.');
    process.exit(1);
}

(async () => {
    const rest = new REST({ version: '9' }).setToken(config.token);
    const route = !config.guildID
        ? Routes.applicationCommands(clientID)
        : Routes.applicationGuildCommands(clientID, config.guildID);

    try {
        logger.info(
            { guild: config.guildID, commands: Array.from(commands.keys()) },
            'Installing application (/) commands',
        );

        await rest.put(route, { body: commands.toJSON() });

        logger.info({ guild: config.guildID }, 'Successfully installed application (/) commands.');
    } catch (err) {
        logger.fatal(err);
        process.exit(1);
    }
})();
