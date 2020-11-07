import { Message } from 'discord.js';
import { sample } from 'lodash';
import { Arguments } from 'yargs';

import { crIndex, hoard, individual } from '../data/treasure';
import { FriendlyError } from '../error';
import { Command } from '../types';
import { roll } from '../utils';

const command: Command = {
    name: 'treasure',
    description: 'Give me the loot!',
    alias: ['loot'],
    usage: 'CR [ROLL] [--hoard]',
    examples: ['4', '6 86', '10 --hoard'],
    async run(message: Message, args: Arguments): Promise<Message[]> {
        const cr = Number(args.cr ?? args._[0]);
        const dice = Number(args.roll || args._[1] || roll('d100'));

        if (isNaN(cr)) {
            throw new FriendlyError('Missing challenge rating');
        }

        const tables = args.hoard ? hoard : individual;
        const table = tables[crIndex(cr)][dice - 1];

        const reply = ['You found:'];
        for (const record of table) {
            const key = record[0] as string;
            const type = record[1];
            const value = record[2] as (string | (() => Promise<string>))[];

            if (!value) {
                reply.push(`* ${roll(key)} ${type}`);
                continue;
            }

            for (let index = 0; index < roll(key); index++) {
                const item = sample(value) ?? '';
                const resolved = typeof item === 'string' ? item : await item();
                reply.push(`* ${type}: ${resolved}`);
            }
        }

        await message.delete();

        return message.channel.send(reply, { split: true });
    },
};

export default command;
