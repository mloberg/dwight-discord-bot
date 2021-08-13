import { isString } from 'lodash';

import magicItemTable from '../data/table';
import { SlashCommand } from '../types';
import { roll } from '../utils';

const table: SlashCommand = {
    name: 'table',
    description: 'Roll on the magic item tables',
    options: [
        {
            name: 'table',
            description: 'Magic item table',
            type: 'STRING',
            required: true,
            choices: Object.keys(magicItemTable).map((key) => ({ name: key.toUpperCase(), value: key })),
        },
        {
            name: 'roll',
            description: 'd100 roll',
            type: 'INTEGER',
        },
    ],
    async run(command) {
        const index = command.options.getString('table', true);
        const dice = command.options.getInteger('roll') || roll('d100');

        const table = magicItemTable[index];
        const item = table[dice - 1];
        const result = isString(item) ? item : await item();

        await command.reply(result);
    },
};

export default table;
