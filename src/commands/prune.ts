import { Client, Message } from 'discord.js';

import { Arguments, Command } from '../types';

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'prune',
            description: 'Prune messages from a channel',
        });
    }

    async run({ channel }: Message, args: Arguments): Promise<void> {
        channel.bulkDelete(Number(args._[0]) + 1, true);
    }
}
