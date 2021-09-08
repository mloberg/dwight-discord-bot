import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { sampleSize } from 'lodash';

import database from '../database';
import { FriendlyError } from '../error';
import { roll } from '../utils';

const deck = [
    'Red dragon',
    'Knight and four guards',
    'Succubus or incubus',
    'Druid',
    'Cloud giant',
    'Ettin',
    'Bugbear',
    'Goblin',
    'Beholder',
    'Archmage and mage apprentice',
    'Night hag',
    'Assassin',
    'Fire giant',
    'Ogre mage',
    'Gnoll',
    'Kobold',
    'Lich',
    'Priest and two acolytes',
    'Medusa',
    'Veteran',
    'Frost giant',
    'Troll',
    'Hobgoblin',
    'Goblin',
    'Iron golem',
    'Bandit captain and three bandits',
    'Erinyes',
    'Berserker',
    'Hill giant',
    'Ogre',
    'Orc',
    'Kobold',
    'You',
    'You',
];

export default {
    config: new SlashCommandBuilder()
        .setName('illusions')
        .setDescription('Manage a Deck of Illusions')
        .addSubcommand((option) =>
            option
                .setName('new')
                .setDescription('Create a new Deck of Illusions')
                .addIntegerOption((option) =>
                    option.setName('missing').setDescription('Number of missing cards (usually d20-1)'),
                ),
        )
        .addSubcommand((option) => option.setName('pull').setDescription('Pull a card from the deck')),
    async handle(command: CommandInteraction): Promise<void> {
        const sub = command.options.getSubcommand();
        const key = `illusions:${command.guild?.id}-${command.user.id}`;

        if (sub === 'new') {
            const missing = command.options.getInteger('missing') ?? roll('d20-1');

            await database.set(key, sampleSize(deck, deck.length - missing));
            return;
        }

        const cards: string[] = await database.get(key, []);
        const card = cards.pop();
        if (!card) {
            throw new FriendlyError('Unable to draw a card.');
        }

        await database.set(key, cards);
        await command.reply(card);
    },
};
