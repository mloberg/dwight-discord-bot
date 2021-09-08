import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export interface SlashCommand {
    config: SlashCommandBuilder;
    handle: (command: CommandInteraction) => Promise<void>;
}
