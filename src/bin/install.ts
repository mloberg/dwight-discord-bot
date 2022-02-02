/* eslint-disable no-process-exit */
/* eslint-disable unicorn/no-process-exit */

import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { APIApplicationCommand, APIGuild, APIPartialGuild, Routes } from 'discord-api-types/v9';

import commands from '../commands';
import config from '../config';
import logger from '../logger';

const clientID = config.clientID;
if (!clientID) {
    logger.fatal('CLIENT_ID environment variable is required to install application (/) commands.');
    process.exit(1);
}

class API {
    private rest: REST;

    constructor(token: string, private clientID: string, private guildID?: string) {
        this.rest = new REST({ version: '9' }).setToken(token);
    }

    async list(): Promise<APIApplicationCommand[]> {
        const route = this.guildID
            ? Routes.applicationGuildCommands(this.clientID, this.guildID)
            : Routes.applicationCommands(this.clientID);

        const response = await this.rest.get(route);
        return response as APIApplicationCommand[];
    }

    async install(commands: SlashCommandBuilder[]): Promise<APIApplicationCommand[]> {
        const route = this.guildID
            ? Routes.applicationGuildCommands(this.clientID, this.guildID)
            : Routes.applicationCommands(this.clientID);
        const body = commands.map((command) => command.toJSON());

        const response = await this.rest.put(route, { body });
        return response as APIApplicationCommand[];
    }

    async uninstall(command: APIApplicationCommand): Promise<void> {
        const route = command.guild_id
            ? Routes.applicationGuildCommand(this.clientID, command.guild_id, command.id)
            : Routes.applicationCommand(this.clientID, command.id);

        await this.rest.delete(route);
    }

    async permission(command: string, guildID: string, user: string, permission = true): Promise<void> {
        const route = Routes.applicationCommandPermissions(this.clientID, guildID, command);
        const body = { permissions: [{ id: user, type: 2, permission }] };

        await this.rest.put(route, { body });
    }

    async guilds(): Promise<string[]> {
        const response = await this.rest.get(Routes.userGuilds());
        const guilds = response as APIPartialGuild[];
        return guilds.map((guild) => guild.id);
    }

    async guild(guildID: string): Promise<APIGuild> {
        const response = await this.rest.get(Routes.guild(guildID));
        return response as APIGuild;
    }
}

(async () => {
    const api = new API(config.token, clientID, config.guildID);

    try {
        if (process.argv.includes('--uninstall')) {
            for (const command of await api.list()) {
                logger.info(
                    { id: command.id, command: command.name, guild: command.guild_id },
                    'Deleting application (/) command',
                );
                await api.uninstall(command);
            }
            return;
        }

        logger.info({ guild: config.guildID, commands: [...commands.keys()] }, 'Installing application (/) commands');
        await api.install(commands.map((command) => command.config));
    } catch (error) {
        logger.fatal(error);
        process.exit(1);
    }
})();
