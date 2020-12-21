import { Message } from 'discord.js';
import { isString } from 'lodash';
import { Arguments } from 'yargs';

import magicItemTable from '../data/table';
import { FriendlyError } from '../error';
import { Command } from '../types';
import { roll } from '../utils';

const command: Command = {
    name: 'table',
    description: 'Roll on the magic item tables',
    usage: 'TABLE [ROLL]',
    async run(message: Message, args: Arguments) {
        const index = (args._[0] || '-').toLowerCase();
        const dice = Number(args._[1] || roll('d100'));

        const table = magicItemTable[index];
        if (!table) {
            throw new FriendlyError(`Unknown table "${index}".`);
        }

        const item = table[dice - 1];

        await message.delete();

        return message.reply(isString(item) ? item : await item());
    },
};

export default command;