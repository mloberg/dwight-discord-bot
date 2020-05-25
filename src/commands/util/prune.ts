import { Command, CommandMessage } from "discord.js-commando";

export default class Prune extends Command {
    constructor(client) {
        super(client, {
            name: "prune",
            group: "util",
            memberName: "prune",
            description: "Prune messages from a channel.",
            examples: ["prune 5"],
            args: [
                {
                    key: "count",
                    label: "messageCount",
                    prompt: "How many messages would you like to prune?",
                    type: "integer",
                },
            ],
        });
    }

    async run({ channel }: CommandMessage, args) {
        channel.bulkDelete(args.count + 1, true);

        return null;
    }
}
