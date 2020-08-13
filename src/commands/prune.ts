import { Message } from 'discord.js';

import { Arguments, Command } from '../types';

const command: Command = {
    name: 'prune',
    description: 'Prune messages from a channel',
    usage: 'COUNT',
    async run({ channel }: Message, args: Arguments): Promise<void> {
        channel.bulkDelete(Number(args._[0]) + 1, true);
    },
};

export default command;
