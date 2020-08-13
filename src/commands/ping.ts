import { Client, Message } from 'discord.js';

import { Command } from '../types';

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'ping',
            description: 'pong',
        });
    }

    async run({ channel }: Message): Promise<Message> {
        return channel.send('pong');
    }
}
