import { Command } from "discord.js-commando";

import spellList from "../../data/spells.json";
import { rand } from "../../utils";

export default class Treasure extends Command {
    constructor(client) {
        super(client, {
            name: "spell",
            aliases: ["scroll", "spellscroll"],
            group: "dnd",
            memberName: "scroll",
            description: "Return a random spell.",
            examples: ["spell 0", "spell 1 school:Evocation class:Wizard"],
            format: "LEVEL <school:?> <class:?>",
            args: [
                {
                    key: "level",
                    prompt: "What level spell to return?",
                    type: "integer",
                },
                {
                    key: "filter",
                    prompt: "Should I filter by anything else?",
                    type: "filter",
                    default: "",
                },
            ],
        });
    }

    async run(msg, args) {
        let spells = spellList.filter(s => s.level === args.level);

        for (const [key, value] of args.filter) {
            spells = spells.filter(s => s[key].toLowerCase() === value.toLowerCase());
        }

        return msg.reply(`${rand(spells).spell}`);
    }
}
