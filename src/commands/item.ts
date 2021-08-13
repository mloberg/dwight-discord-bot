import { sample } from 'lodash';

import itemList from '../data/items';
import { FriendlyError } from '../error';
import { SlashCommand } from '../types';

const item: SlashCommand = {
    name: 'item',
    description: 'Return a random magic item',
    options: [
        {
            name: 'rarity',
            description: 'Item rarity',
            type: 'STRING',
            choices: [
                {
                    name: 'Common',
                    value: 'common',
                },
                {
                    name: 'Uncommon',
                    value: 'uncommon',
                },
                {
                    name: 'Rare',
                    value: 'rare',
                },
                {
                    name: 'Very Rare',
                    value: 'very rare',
                },
                {
                    name: 'Legendary',
                    value: 'legendary',
                },
                {
                    name: 'Artifact',
                    value: 'artifact',
                },
            ],
        },
        {
            name: 'type',
            description: 'Item type',
            type: 'STRING',
        },
    ],
    async run(command) {
        const rarity = command.options.getString('rarity');
        const type = command.options.getString('type');

        let items = await itemList();
        if (rarity) {
            items = items.filter((i) => i.rarity === rarity);
        }
        if (type) {
            const typeFilter = type.toLowerCase() === 'wondrous' ? 'wondrous item' : type.toLowerCase();
            items = items.filter((i) => i.type.toLowerCase() === typeFilter || i.subtype?.toLowerCase() === typeFilter);
        }

        const result = sample(items);
        if (!result) {
            throw new FriendlyError("I couldn't find an item matching those parameters.");
        }

        await command.reply(result.item);
    },
};

export default item;
