import { FriendlyError } from '../error';
import { SlashCommand } from '../types';

const prune: SlashCommand = {
    name: 'prune',
    description: 'Prune messages',
    options: [
        {
            name: 'messages',
            description: 'Number of messages to delete',
            type: 'INTEGER',
            required: true,
        },
    ],
    async run(command) {
        if (!command.channel || command.channel?.type !== 'GUILD_TEXT') {
            throw new FriendlyError("I can't bulk delete messages in this channel.");
        }

        const messages = command.options.getInteger('messages') ?? 0;
        await command.reply('...');
        await command.channel.bulkDelete(messages + 1);
    },
};

export default prune;
