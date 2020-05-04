import Command from "../command";

export default class extends Command {
    constructor(client) {
        super(client, {
            name: "prune",
            description: "Prune up to 99 messages.",
        });
    }

    run({ channel }, args): void {
        const count = args._[0] + 1;

        if (isNaN(count)) {
            throw new TypeError("not a valid number");
        }

        channel.bulkDelete(count, true);
    }
}
