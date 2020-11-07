import { Message } from 'discord.js';
import { Arguments } from 'yargs';

import { Command } from '../types';
import { roll } from '../utils';

export const elixirs = [
    '**Healing**. The drinker regains a number of hit points equal to 2d4 + your Intelligence modifier.',
    '**Swiftness**. The drinker’s walking speed increases by 10 feet for 1 hour.',
    '**Resilience**. The drinker gains a +1 bonus to AC for 10 minutes.',
    '**Boldness**. The drinker can roll a d4 and add the number rolled to every attack roll and saving throw they make for the next minute.',
    '**Flight**. The drinker gains a flying speed of 10 feet for 10 minutes.',
    '**Transformation**. The drinker’s body is transformed as if by the alter self spell. The drinker determines the transformation caused by the spell, the effects of which last for 10 minutes.',
];

const command: Command = {
    name: 'elixir',
    alias: ['elx'],
    description: 'Craft an experimental elixir',
    async run(message: Message, args: Arguments): Promise<Message> {
        const dice = Number(args.roll || args._[0] || roll('d6'));
        const result = elixirs[dice - 1];

        await message.delete();

        return message.reply(result);
    },
};

export default command;
