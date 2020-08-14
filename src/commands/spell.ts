import { Message } from 'discord.js';

import spellList from '../data/spells';
import { FriendlyError } from '../error';
import { Arguments, Command } from '../types';
import { random, ucfirst } from '../utils';

const command: Command = {
    name: 'spell',
    description: 'Return a random spell',
    alias: ['spells'],
    usage: '[--level] LEVEL [--class] CLASS [--school] SCHOOL',
    examples: ['cantrip', '1 bard', '4 --school illusion'],
    async run(message: Message, args: Arguments): Promise<Message> {
        const level = args.level || args._[0];
        const type = args.class || args._[1];
        const school = args.school || args._[2];

        let spells = await spellList();
        if (level) {
            spells = spells.filter((s) => level === s.level || (s.level === 0 && level === 'cantrip'));
        }

        if (type) {
            spells = spells.filter((s) => s.class.includes(ucfirst(type)));
        }

        if (school) {
            spells = spells.filter((s) => school === s.school);
        }

        const spell = random(spells);
        if (!spell) {
            throw new FriendlyError("I couldn't find an spell matching those parameters.");
        }

        return message.reply(spell.spell);
    },
};

export default command;
