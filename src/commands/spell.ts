import { Message } from 'discord.js';
import { sample, upperFirst } from 'lodash';
import { Arguments } from 'yargs';

import spellList from '../data/spells';
import { FriendlyError } from '../error';
import { Command } from '../types';

const command: Command = {
    name: 'spell',
    description: 'Return a random spell',
    alias: ['spells'],
    usage: '[--level] LEVEL [--class] CLASS [--school] SCHOOL',
    examples: ['cantrip', '1 bard', '4 --school illusion'],
    async run(message: Message, args: Arguments): Promise<Message> {
        const levelInput = String(args.level ?? args._[0]);
        const level = 'cantrip' === levelInput.toLowerCase() ? 0 : Number(levelInput);
        const type = (args.class || args._[1]) as string;
        const school = (args.school || args._[2]) as string;

        let spells = await spellList();
        if (!isNaN(level)) {
            spells = spells.filter((s) => s.level === level);
        }

        if (type) {
            spells = spells.filter((s) => s.class.includes(upperFirst(type)));
        }

        if (school) {
            spells = spells.filter((s) => s.school.toLowerCase() === school.toLowerCase());
        }

        const spell = sample(spells);
        if (!spell) {
            throw new FriendlyError("I couldn't find a spell matching those parameters.");
        }

        return message.reply(spell.spell);
    },
};

export default command;
