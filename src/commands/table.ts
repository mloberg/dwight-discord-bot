import { isString } from 'lodash';

import { CommandBuilder, rollOption } from '../command';
import magicItemTable from '../data/table';
import { roll } from '../utils';

export default new CommandBuilder(async (command) => {
    const index = command.options.getString('table', true);
    const dice = command.options.getInteger('roll') || roll('d100');

    const table = magicItemTable[index];
    const item = table[dice - 1];
    const result = isString(item) ? item : await item();

    await command.reply(result);
})
    .setName('table')
    .setDescription('Roll on the magic item tables')
    .addStringOption((option) =>
        option
            .setName('table')
            .setDescription('Magic item table to roll on')
            .setRequired(true)
            .addChoices(Object.keys(magicItemTable).map((key) => [key.toUpperCase(), key])),
    )
    .addIntegerOption(rollOption('d100'));
