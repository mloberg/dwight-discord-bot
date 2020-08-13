import { Message } from 'discord.js';

import { Command } from '../types';

const command: Command = {
    name: 'ping',
    description: 'Pong',
    async run({ channel }: Message): Promise<Message> {
        return channel.send('pong');
    },
};

export default command;
