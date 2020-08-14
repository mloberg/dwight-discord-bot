import { Message } from 'discord.js';

import itemList from '../data/items';
import { FriendlyError } from '../error';
import { Arguments, Command } from '../types';
import { random } from '../utils';

const command: Command = {
    name: 'item',
    description: 'Return a random magic item',
    alias: ['items'],
    usage: '[--rarity] RARITY [--type] TYPE',
    examples: ['rare', 'rare weapon', '--type weapon'],
    async run(message: Message, args: Arguments): Promise<Message> {
        const rarity = args.rarity || args._[0];
        const type = args.type || args._[1];

        let items = await itemList();
        if (rarity) {
            items = items.filter((i) => rarity.toLowerCase() === i.rarity);
        }

        if (type) {
            items = items.filter((i) =>
                type.toLowerCase() === 'wondrous' ? 'wondrous item' : type.toLowerCase() === i.type,
            );
        }

        const item = random(items);
        if (!item) {
            throw new FriendlyError("I couldn't find an item matching those parameters.");
        }

        return message.reply(item.item);
    },
};

export default command;
