import { SlashCommandBuilder, SlashCommandIntegerOption } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

type Handler = (command: CommandInteraction) => Promise<void>;

export class CommandBuilder extends SlashCommandBuilder {
    constructor(readonly handler: Handler) {
        super();
    }
}

export const rollOption = (dice: string): SlashCommandIntegerOption =>
    new SlashCommandIntegerOption().setName('roll').setDescription(`Value of a ${dice} roll.`);
