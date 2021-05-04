import { sample } from 'lodash';

import Command from '../command';
import itemList from '../data/items';
import { FriendlyError } from '../error';

export default new Command({
    name: 'item',
    description: 'Return a random magic item',
    alias: ['items'],
    args: /(?<rarity>common|uncommon|rare|very rare|legendary|artifact)? ?(?<type>\w+)?/,
    usage: '[rarity] [type]',
    examples: ['rare', 'rare weapon', 'weapon'],
    async run(message, { groups }) {
        const { rarity, type } = groups;

        let items = await itemList();
        if (rarity) {
            items = items.filter((i) => i.rarity.toLowerCase() === rarity.toLowerCase());
        }

        if (type) {
            const typeFilter = type.toLowerCase() === 'wondrous' ? 'wondrous item' : type.toLowerCase();
            items = items.filter(
                (i) => i.type.toLowerCase() === typeFilter || (i.subtype && i.subtype.toLowerCase() === typeFilter),
            );
        }

        const item = sample(items);
        if (!item) {
            throw new FriendlyError("I couldn't find an item matching those parameters.");
        }

        return message.reply(item.item);
    },
});
