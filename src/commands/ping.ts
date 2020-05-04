import Command from "../command";

export default class extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Ping!",
        });
    }

    run({ channel }): void {
        channel.send("Bears, Beets, Battlestar Galatica");
    }
}
