import { Client, Message } from 'discord.js';
import { isString } from 'util';

import treasure, { crIndex } from '../data/treasure';
import { Arguments, Command } from '../types';
import { random, roll } from '../utils';

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'treasure',
            description: 'Give me the loot!',
        });
    }

    async run(message: Message, args: Arguments): Promise<Message> {
        const cr = args.cr || args._[0];
        const dice = args.roll || args._[1] || roll('d100');

        if (!cr) {
            throw new Error('Missing challenge rating');
        }

        const tables = args.hoard ? treasure.hoard : treasure.individual;
        const table = tables[crIndex(cr)][dice - 1];

        let reply = 'You found:';
        for (const [key, type, value] of table) {
            if (!value) {
                reply += `\n* ${roll(key)} ${type}`;
                continue;
            }

            for (let index = 0; index < roll(key); index++) {
                const item = await this.resolveItem(random(value));
                reply += `\n* ${type}: ${item}`;
            }
        }

        await message.delete();

        return message.channel.send(reply);
    }

    private async resolveItem(value: string | { (): PromiseLike<string> }): Promise<string> {
        return isString(value) ? value : await value();
    }
}
