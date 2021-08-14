import { isString, sample } from 'lodash';

import { CommandBuilder, rollOption } from '../command';
import { crIndex, hoard, individual } from '../data/treasure';
import { roll } from '../utils';

export default new CommandBuilder(async (command) => {
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
})
    .setName('treasure')
    .setDescription('Give me the loot!')
    .addIntegerOption((option) => option.setName('cr').setDescription('Challenge rating').setRequired(true))
    .addIntegerOption(rollOption('d100'))
    .addBooleanOption((option) => option.setName('hoard').setDescription('Generate a treasure hoard'));
