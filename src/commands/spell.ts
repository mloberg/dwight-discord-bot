import { isNumber, sample } from 'lodash';

import spellList from '../data/spells';
import { FriendlyError } from '../error';
import { SlashCommand } from '../types';

const spell: SlashCommand = {
    name: 'spell',
    description: 'Return a random spell',
    options: [
        {
            name: 'level',
            description: 'Spell level',
            type: 'INTEGER',
            choices: [
                {
                    name: 'Cantrip',
                    value: 0,
                },
                {
                    name: '1st',
                    value: 1,
                },
                {
                    name: '2nd',
                    value: 2,
                },
                {
                    name: '3rd',
                    value: 3,
                },
                {
                    name: '4th',
                    value: 4,
                },
                {
                    name: '5th',
                    value: 5,
                },
                {
                    name: '6th',
                    value: 6,
                },
                {
                    name: '7th',
                    value: 7,
                },
                {
                    name: '8th',
                    value: 8,
                },
                {
                    name: '9th',
                    value: 9,
                },
            ],
        },
        {
            name: 'school',
            description: 'Spell school',
            type: 'STRING',
            choices: [
                {
                    name: 'Abjuration',
                    value: 'abjuration',
                },
                {
                    name: 'Conjuration',
                    value: 'conjuration',
                },
                {
                    name: 'Divination',
                    value: 'divination',
                },
                {
                    name: 'Enchanment',
                    value: 'enchantment',
                },
                {
                    name: 'Evocation',
                    value: 'evocation',
                },
                {
                    name: 'Illusion',
                    value: 'illusion',
                },
                {
                    name: 'Necromancy',
                    value: 'necromancy',
                },
                {
                    name: 'Transmutation',
                    value: 'transmutation',
                },
            ],
        },
        {
            name: 'class',
            description: 'Spell class',
            type: 'STRING',
            choices: [
                {
                    name: 'Bard',
                    value: 'Bard',
                },
                {
                    name: 'Cleric',
                    value: 'Cleric',
                },
                {
                    name: 'Druid',
                    value: 'Druid',
                },
                {
                    name: 'Paladin',
                    value: 'Paladin',
                },
                {
                    name: 'Ranger',
                    value: 'Ranger',
                },
                {
                    name: 'Warlock',
                    value: 'Warlock',
                },
                {
                    name: 'Wizard',
                    value: 'Wizard',
                },
            ],
        },
    ],
    async run(command) {
        const level = command.options.getInteger('level');
        const school = command.options.getString('school');
        const class_ = command.options.getString('class');

        let spells = await spellList();
        if (isNumber(level)) {
            spells = spells.filter((s) => s.level === level);
        }
        if (school) {
            spells = spells.filter((s) => s.school.toLowerCase() === school);
        }
        if (class_) {
            spells = spells.filter((s) => s.class.includes(class_));
        }

        const result = sample(spells);
        if (!result) {
            throw new FriendlyError("I couldn't find a spell matching those parameters.");
        }

        await command.reply(result.spell);
    },
};

export default spell;
