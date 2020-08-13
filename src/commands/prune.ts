import { Message, Client } from "discord.js";
import { Command, Arguments } from "../types";

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: "prune",
            description: "Prune messages from a channel",
        })
    }

    async run({ channel }: Message, args: Arguments) {
        channel.bulkDelete(Number(args._[0]) + 1, true);
    }
}
