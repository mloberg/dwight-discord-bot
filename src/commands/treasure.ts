import { isString, sample } from 'lodash';

import { crIndex, hoard, individual } from '../data/treasure';
import { FriendlyError } from '../error';
import { Command } from '../types';
import { roll } from '../utils';

const command: Command = {
    name: 'treasure',
    alias: ['loot'],
    args: /(?<hoard>hoard )?(?<cr>\d+)(?<roll> \d+)?/,
    description: 'Give me the loot!',
    usage: '[hoard] <cr> [d100]',
    examples: ['4', '6 86', 'hoard 10'],
    async run(message, { groups }) {
        const cr = Number(groups.cr);
        const dice = Number(groups.roll || roll('d100'));

        if (isNaN(cr)) {
            throw new FriendlyError('Missing challenge rating');
        }

        const tables = groups.hoard ? hoard : individual;
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
                const resolved = isString(item) ? item : await item();
                reply.push(`* ${type}: ${resolved}`);
            }
        }

        await message.delete();

        return message.channel.send(reply, { split: true });
    },
};

export default command;
