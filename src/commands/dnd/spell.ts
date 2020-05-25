import { Command, CommandMessage, FriendlyError } from "discord.js-commando";

import spellList from "../../data/spells";
import { rand } from "../../utils";


export default class Treasure extends Command {
    constructor(client) {
        super(client, {
            name: "spell",
            aliases: ["scroll", "spellscroll"],
            group: "dnd",
            memberName: "spell",
            description: "Return a random spell.",
            examples: ["spell 0", "spell 1 Wizard Evocation"],
            format: "LEVEL CLASS SCHOOL",
            args: [
                {
                    key: "level",
                    prompt: "What level spell to return?",
                    type: "integer",
                },
                {
                    key: "class",
                    prompt: "What caster class should I filter by?",
                    type: "string",
                    default: "",
                    validate: c => ["bard", "cleric", "druid", "paladin", "ranger", "sorcerer", "warlock", "wizard"].includes(c.toLowerCase()),
                    parse: c => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase(),
                },
                {
                    key: "school",
                    prompt: "What school of magic should I filter by?",
                    type: "string",
                    default: "",
                    validate: s => ["abjuration", "conjuration", "divination", "enchantment", "evocation", "illusion", "necromancy", "transmutation"].includes(s.toLowerCase()),
                    parse: s => s.toLowerCase(),
                }
            ],
        });
    }

    async run(msg: CommandMessage, args) {
        let spells = (await spellList()).filter(s => s.level === args.level);

        if (args.class) {
            spells = spells.filter(s => s.class.includes(args.class));
        }

        if (args.school) {
            spells = spells.filter(s => s.school === args.school);
        }

        const spell = rand(spells);
        if (!spell) {
            throw new FriendlyError("I couldn't find a spell with those filters.");
        }

        return msg.reply(`${spell.spell}`);
    }
}
