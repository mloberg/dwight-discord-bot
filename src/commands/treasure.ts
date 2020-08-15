import { Message } from 'discord.js';

import treasure, { crIndex } from '../data/treasure';
import { FriendlyError } from '../error';
import { Arguments, Command } from '../types';
import { random, resolve, roll } from '../utils';

const command: Command = {
    name: 'treasure',
    description: 'Give me the loot!',
    alias: ['loot'],
    usage: 'CR [ROLL] [--hoard]',
    examples: ['4', '6 86', '10 --hoard'],
    async run(message: Message, args: Arguments): Promise<Message> {
        const cr = args.cr || args._[0];
        const dice = args.roll || args._[1] || roll('d100');

        if (!cr) {
            throw new FriendlyError('Missing challenge rating');
        }

        const tables = args.hoard ? treasure.hoard : treasure.individual;
        const table = tables[crIndex(cr)][dice - 1];

        const reply = ['You found:'];
        for (const [key, type, value] of table) {
            if (!value) {
                reply.push(`* ${roll(key)} ${type}`);
                continue;
            }

            for (let index = 0; index < roll(key); index++) {
                const item = await resolve(random(value));
                reply.push(`* ${type}: ${item}`);
            }
        }

        await message.delete();

        return message.channel.send(reply, { split: true });
    },
};

export default command;
