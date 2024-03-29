import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import { FriendlyError } from '../error';

export default {
    config: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Prune messages')
        .addIntegerOption((option) =>
            option.setName('messages').setDescription('Number of messages to delete').setRequired(true),
        ),
    async handle(command: CommandInteraction): Promise<void> {
        if (!command.channel || command.channel?.type !== 'GUILD_TEXT') {
            throw new FriendlyError("I can't bulk delete messages in this channel.");
        }

        const messages = command.options.getInteger('messages', true);
        await command.reply('...');
        await command.channel.bulkDelete(messages + 1);
    },
};
