import { isString, sample } from 'lodash';

import { crIndex, hoard, individual } from '../data/treasure';
import { SlashCommand } from '../types';
import { roll } from '../utils';

const treasure: SlashCommand = {
    name: 'treasure',
    description: 'Give me the loot!',
    options: [
        {
            name: 'cr',
            description: 'Challenge rating',
            type: 'INTEGER',
            required: true,
        },
        {
            name: 'roll',
            description: 'd100 roll',
            type: 'INTEGER',
        },
        {
            name: 'hoard',
            description: 'Generate a treasure hoard',
            type: 'BOOLEAN',
        },
    ],
    async run(command) {
        const cr = command.options.getInteger('cr', true);
        const dice = command.options.getInteger('roll') || roll('d100');
        const isHoard = command.options.getBoolean('hoard') ?? false;

        const tables = isHoard ? hoard : individual;
        const table = tables[crIndex(cr)][dice - 1];
        const results = [];

        for (const record of table) {
            const [key, type, value] = record;
            const count = roll(key as string);

            if (!value) {
                results.push(`* ${count} ${type}`);
                continue;
            }

            for (let index = 0; index < count; index++) {
                const item = sample(value) ?? '';
                const resolved = isString(item) ? item : await item();
                results.push(`* ${type}: ${resolved}`);
            }
        }

        await command.reply(results.join('\n'));
    },
};

export default treasure;
