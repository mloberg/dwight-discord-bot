import { Command } from "discord.js-commando";

import itemList from "../../data/items.json";
import { rand } from "../../utils";

export default class Treasure extends Command {
    constructor(client) {
        super(client, {
            name: "item",
            aliases: ["magic-item"],
            group: "dnd",
            memberName: "item",
            description: "Return a random magic item.",
            examples: ["spell uncommon"],
            format: "RARITY",
            args: [
                {
                    key: "rarity",
                    prompt: "What item rarity to return?",
                    type: "string",
                    validate: v => ["common", "uncommon", "rare", "very rare", "legendary", "varies"].includes(v.toLowerCase()),
                },
            ],
        });
    }

    async run(msg, args) {
        const items = itemList.filter(i => i.rarity === args.rarity.toLowerCase());
        const item = rand(items);

        return msg.reply(item.item);
    }
}
