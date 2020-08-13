import { Message, Client } from "discord.js";
import { Command, Arguments } from "../types";

import spellList from "../data/spells";
import { rand, ucfirst } from "../utils";

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: "spell",
            description: "Return a random spell",
        });
    }

    async run(message: Message, args: Arguments) {
        const level = args.level || args._[0];
        const type = args.class || args._[1];
        const school = args.school || args._[2];

        let spells = await spellList();
        if (level) {
            spells = spells.filter(s => level === s.level || (s.level === 0 && level === 'cantrip'));
        }

        if (type) {
            spells = spells.filter(s => s.class.includes(ucfirst(type)));
        }

        if (school) {
            spells = spells.filter(s => school === s.school);
        }

        const spell = rand(spells);
        if (!spell) {
            throw new Error("I could not find an spell matching those parameters.");
        }

        return message.reply(spell.spell);
    }
}
