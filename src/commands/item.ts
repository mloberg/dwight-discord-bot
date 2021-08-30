import { sample } from 'lodash';

import { CommandBuilder } from '../command';
import itemList from '../data/items';
import { FriendlyError } from '../error';

export default new CommandBuilder(async (command) => {
    const rarity = command.options.getString('rarity');
    const type = command.options.getString('type');

    let items = await itemList();
    if (rarity) {
        items = items.filter((item) => item.rarity === rarity);
    }
    if (type) {
        const typeFilter = type.toLowerCase() === 'wondrous' ? 'wondrous item' : type.toLowerCase();
        items = items.filter(
            (item) => item.type.toLowerCase() === typeFilter || item.subtype?.toLowerCase() === typeFilter,
        );
    }

    const result = sample(items);
    if (!result) {
        throw new FriendlyError("I couldn't find an item matching those parameters.");
    }

    await command.reply(result.item);
})
    .setName('item')
    .setDescription('Return a random magic item')
    .addStringOption((option) =>
        option
            .setName('rarity')
            .setDescription('Item rarity')
            .addChoice('Common', 'common')
            .addChoice('Uncommon', 'uncommon')
            .addChoice('Rare', 'rare')
            .addChoice('Very Rare', 'very rare')
            .addChoice('Legendary', 'legendary')
            .addChoice('Artifact', 'artifact'),
    )
    .addStringOption((option) => option.setName('type').setDescription('Item type or subtype'));
