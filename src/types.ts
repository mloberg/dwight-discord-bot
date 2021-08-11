import { ApplicationCommandData, CommandInteraction } from 'discord.js';

export type SlashCommand = ApplicationCommandData & {
    run(command: CommandInteraction): Promise<void>;
};
