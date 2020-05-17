import { Command } from "discord.js-commando";

import treasure, { crIndex } from "../../data/treasure";
import { rand, roll as _d } from "../../utils";

export default class Treasure extends Command {
    constructor(client) {
        super(client, {
            name: "treasure",
            aliases: ["loot"],
            group: "dnd",
            memberName: "treasure",
            description: "Generate random treasure.",
            examples: ["treasure ind 2", "treasure hoard 5 72"],
            format: "[ind|individual|group|hoard] CR <d100>",
            args: [
                {
                    key: "type",
                    prompt: "What type of treasure to generate?",
                    type: "string",
                    validate: v => ["ind", "individual", "group", "hoard"].includes(v), // use oneOf in next version
                },
                {
                    key: "cr",
                    label: "challengeRating",
                    prompt: "What was the challenge rating?",
                    type: "integer",
                    min: 0,
                },
                {
                    key: "roll",
                    prompt: "What was the d100 roll?",
                    type: "integer",
                    default: 0,
                    min: 1,
                    max: 100,
                },
            ],
        });
    }

    async run(msg, args) {
        const roll = 0 === args.roll ? _d("d100") : args.roll;
        const table = (["ind", "individual"].includes(args.type)
            ? treasure.individual
            : treasure.hoard)[crIndex(args.cr)][roll - 1];

        let reply = "You found:";
        for (const [key, type, value] of table) {
            if (!value) {
                reply += `\n* ${_d(key)} ${type}`;
                continue;
            }

            for (let index = 0; index < _d(key); index++) {
                let item = rand(value);
                if (item instanceof Function) {
                    item = item();
                }
                reply += `\n* ${type}: ${item}`;
            }
        }

        return msg.channel.send(reply);
    }
}
