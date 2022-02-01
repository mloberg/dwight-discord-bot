import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { isString } from 'lodash';

import magicItemTable from '../data/table';
import { roll, rollOption } from '../utils';

export default {
    config: new SlashCommandBuilder()
        .setName('table')
        .setDescription('Roll on the magic item tables')
        .addStringOption((option) =>
            option
                .setName('table')
                .setDescription('Magic item table to roll on')
                .setRequired(true)
                .addChoices(Object.keys(magicItemTable).map((key) => [key.toUpperCase(), key])),
        )
        .addIntegerOption(rollOption('d100').setMinValue(1).setMaxValue(100)),
    async handle(command: CommandInteraction): Promise<void> {
        const index = command.options.getString('table', true);
        const dice = command.options.getInteger('roll') || roll('d100');

        const table = magicItemTable[index];
        const item = table[dice - 1];
        const result = isString(item) ? item : await item();

        await command.reply(result);
    },
};
