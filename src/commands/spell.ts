import { sample, upperFirst } from 'lodash';

import Command from '../command';
import spellList from '../data/spells';
import { FriendlyError } from '../error';

export default new Command({
    name: 'spell',
    description: 'Return a random spell',
    alias: ['spells'],
    args: /(?<level>cantrip|\d(?:[sthnrd]+)?)? ?(?<class>bard|cleric|druid|paladin|ranger|warlock|wizard)? ?(?<school>\w+)?/,
    usage: '[level] [class] [school]',
    examples: ['cantrip', '1 bard', '4 illusion'],
    async run(message, { groups }) {
        const levelInput = String(groups.level);
        const level = 'cantrip' === levelInput.toLowerCase() ? 0 : Number(levelInput);
        const type = groups.class;
        const school = groups.school;

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
});
