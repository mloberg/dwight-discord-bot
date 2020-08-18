import { Message } from 'discord.js';

import { FriendlyError } from '../error';
import { Arguments, Command } from '../types';

const command: Command = {
    name: 'prune',
    description: 'Prune messages from a channel',
    usage: 'COUNT',
    async run(message: Message, args: Arguments) {
        if (message.channel.type === 'dm') {
            throw new FriendlyError("I can't bulk delete in DMs.");
        }

        await message.channel.bulkDelete(Number(args._[0]) + 1, true);
    },
};

export default command;
