import { Command, FriendlyError } from "discord.js-commando";

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
                    validate: v => ["common", "uncommon", "rare", "very rare", "legendary"].includes(v.toLowerCase()),
                    parse: v => v.toLowerCase(),
                },
                {
                    key: "type",
                    prompt: "What type of item should I return?",
                    type: "string",
                    default: "",
                    parse: v => v.toLowerCase() === "wondrous" ? "wondrous item" : v.toLowerCase(),
                },
            ],
        });
    }

    async run(msg, args) {
        let items = itemList.filter(i => i.rarity === args.rarity);

        if (args.type) {
            items = items.filter(i => i.type.toLowerCase() === args.type);
        }

        const item = rand(items);
        if (!item) {
            throw new FriendlyError("I could not find an item with those parameters.");
        }

        return msg.reply(item.item);
    }
}
