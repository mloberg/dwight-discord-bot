import { Message } from 'discord.js';
import { sample } from 'lodash';
import { Arguments } from 'yargs';

import itemList from '../data/items';
import { FriendlyError } from '../error';
import { Command } from '../types';

const command: Command = {
    name: 'item',
    description: 'Return a random magic item',
    alias: ['items'],
    usage: '[--rarity] RARITY [--type] TYPE',
    examples: ['rare', 'rare weapon', '--type weapon'],
    async run(message: Message, args: Arguments): Promise<Message> {
        const rarity = (args.rarity || args._[0]) as string;
        const type = (args.type || args._[1]) as string;

        let items = await itemList();
        if (rarity) {
            const rarityFilter = rarity.toLowerCase() === 'vrare' ? 'very rare' : rarity.toLowerCase();
            items = items.filter((i) => i.rarity.toLowerCase() === rarityFilter);
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
};

export default command;
