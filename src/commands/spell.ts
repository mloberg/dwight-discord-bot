import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { isNumber, sample } from 'lodash';

import spellList from '../data/spells';
import { FriendlyError } from '../error';

export default {
    config: new SlashCommandBuilder()
        .setName('spell')
        .setDescription('Return a random spell')
        .addIntegerOption((option) =>
            option
                .setName('level')
                .setDescription('Spell level')
                .addChoice('Cantrip', 0)
                .addChoice('1st', 1)
                .addChoice('2nd', 2)
                .addChoice('3rd', 3)
                .addChoice('4th', 4)
                .addChoice('5th', 5)
                .addChoice('6th', 6)
                .addChoice('7th', 7)
                .addChoice('8th', 8)
                .addChoice('9th', 9),
        )
        .addStringOption((option) =>
            option
                .setName('school')
                .setDescription('Spell school')
                .addChoice('Abjuration', 'abjuration')
                .addChoice('Conjuration', 'conjuration')
                .addChoice('Divination', 'divination')
                .addChoice('Enchanment', 'enchantment')
                .addChoice('Evocation', 'evocation')
                .addChoice('Illusion', 'illusion')
                .addChoice('Necromancy', 'necromancy')
                .addChoice('Transmutation', 'transmutation'),
        )
        .addStringOption((option) =>
            option
                .setName('class')
                .setDescription('Spell class')
                .addChoice('Bard', 'Bard')
                .addChoice('Cleric', 'Cleric')
                .addChoice('Druid', 'Druid')
                .addChoice('Paladin', 'Paladin')
                .addChoice('Ranger', 'Ranger')
                .addChoice('Warlock', 'Warlock')
                .addChoice('Wizard', 'Wizard'),
        ),
    async handle(command: CommandInteraction): Promise<void> {
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
