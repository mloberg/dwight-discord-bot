import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import { roll, rollOption } from '../utils';

export const elixirs = [
    '**Healing**. The drinker regains a number of hit points equal to 2d4 + your Intelligence modifier.',
    '**Swiftness**. The drinker’s walking speed increases by 10 feet for 1 hour.',
    '**Resilience**. The drinker gains a +1 bonus to AC for 10 minutes.',
    '**Boldness**. The drinker can roll a d4 and add the number rolled to every attack roll and saving throw they make for the next minute.',
    '**Flight**. The drinker gains a flying speed of 10 feet for 10 minutes.',
    '**Transformation**. The drinker’s body is transformed as if by the alter self spell. The drinker determines the transformation caused by the spell, the effects of which last for 10 minutes.',
];

export default {
    config: new SlashCommandBuilder()
        .setName('elixir')
        .setDescription('Craft an experimental elixir')
        .addIntegerOption(rollOption('d6')),
    async handle(command: CommandInteraction): Promise<void> {
        const dice = command.options.getInteger('roll') || roll('d6');
        const result = elixirs[dice - 1];

        await command.reply(result);
    },
};
