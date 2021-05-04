import { isString } from 'lodash';

import Command from '../command';
import magicItemTable from '../data/table';
import { FriendlyError } from '../error';
import { roll } from '../utils';

export default new Command({
    name: 'table',
    description: 'Roll on the magic item tables',
    usage: '<table> [d100]',
    async run(message, { args }) {
        const index = (args[0] || '-').toLowerCase();
        const dice = Number(args[1] || roll('d100'));

        const table = magicItemTable[index];
        if (!table) {
            throw new FriendlyError(`Unknown table "${index}".`);
        }

        const item = table[dice - 1];

        await message.delete();

        return message.reply(isString(item) ? item : await item());
    },
});
