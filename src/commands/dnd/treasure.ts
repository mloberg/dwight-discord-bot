import { Command, CommandMessage } from "discord.js-commando";
import { isString } from "util";

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
            examples: ["treasure 2", "treasure !5 72"],
            format: "[!]CR <d100>",
            args: [
                {
                    key: "cr",
                    prompt: "What is the challenge rating?",
                    type: "crit",
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

    async run(msg: CommandMessage, args) {
        const [hoard, cr] = args.cr;
        const roll = 0 === args.roll ? _d("d100") : args.roll;
        const tables = hoard ? treasure.hoard : treasure.individual;
        const table = tables[crIndex(cr)][roll - 1];

        let reply = "You found:";
        for (const [key, type, value] of table) {
            if (!value) {
                reply += `\n* ${_d(key)} ${type}`;
                continue;
            }

            for (let index = 0; index < _d(key); index++) {
                const item = await this.resolveItem(rand(value));
                reply += `\n* ${type}: ${item}`;
            }
        }

        return msg.channel.send(reply);
    }

    private async resolveItem(value: string|Function): Promise<string> {
        return isString(value) ? value : await value();
    }
}
