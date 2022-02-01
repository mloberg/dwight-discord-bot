import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import { roll, rollOption } from '../utils';

export const events = [
    'A door opens',
    'A fire starts',
    'A meteor shoots across the sky',
    'A monster appears',
    'A screech pierces the air',
    'A storm begins',
    'A strange star appears in the sky',
    'A strong gust of wind blows through',
    'A tremor shakes the ground',
    'Someone experiences déjà vu',
    'Someone gets angry',
    'Someone glimpses the future',
    'Someone has a sense of foreboding',
    'Someone has to go to the bathroom',
    'Something spills or falls to the ground',
    "Something isn't where it's supposed to be",
    'The lights go out',
    'The sun comes out',
    "There's a foul smell in the air",
    'Unexplained magic occurs',
];

export default {
    config: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Trigger a random event')
        .addIntegerOption(rollOption('d20').setMinValue(1).setMaxValue(20)),
    async handle(command: CommandInteraction): Promise<void> {
        const dice = command.options.getInteger('roll') || roll('d20');
        const event = events[dice - 1] || 'Something happens';

        await command.reply(event);
    },
};
