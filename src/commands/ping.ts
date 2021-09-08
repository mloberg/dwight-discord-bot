import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export default {
    config: new SlashCommandBuilder().setName('ping').setDescription('Pong'),
    async handle(command: CommandInteraction): Promise<void> {
        await command.reply('🏓');
    },
};
