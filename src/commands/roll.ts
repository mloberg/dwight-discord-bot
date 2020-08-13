import { Message } from 'discord.js';

import { Arguments, Command } from '../types';
import { roll } from '../utils';

const command: Command = {
    name: 'roll',
    description: 'Roll some dice',
    usage: 'DICE',
    examples: ['d20+3', '2d8+6', '6d4'],
    async run(message: Message, args: Arguments): Promise<Message> {
        const expression = args._.join('');

        await message.delete();

        return message.reply(roll(expression));
    },
};

export default command;
