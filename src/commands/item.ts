import { Client, Message } from 'discord.js';

import itemList from '../data/items';
import { Arguments, Command } from '../types';
import { rand } from '../utils';

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'item',
            description: 'Return a random magic item',
        });
    }

    async run(message: Message, args: Arguments): Promise<Message> {
        const rarity = args.rarity || args._[0];
        const type = args.type || args._[1];

        let items = await itemList();
        if (rarity) {
            items = items.filter((i) => rarity === i.rarity);
        }

        if (type) {
            items = items.filter((i) => type === i.type.toLowerCase());
        }

        const item = rand(items);
        if (!item) {
            throw new Error('I could not find an item matching those parameters.');
        }

        return message.reply(item.item);
    }
}
