import Commando from "discord.js-commando";
import path from "path";

import { env } from "./utils";

const client = new Commando.CommandoClient({
    owner: "690307094250782801",
    commandPrefix: env("BOT_PREFIX", "^"),
});

client.on("error", console.error);
client.on("warn", console.warn);

if (process.env.DEBUG) {
    client.on("debug", console.log);
}

client.on("ready", () => {
    client.user.setActivity("Assistant to the Dungeon Master");

    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
});
client.on("commandError", (cmd, err) => {
    if (err instanceof Commando.FriendlyError) {
        return;
    }

    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
});

client.registry
    .registerDefaults()
    .registerGroup("dnd")
    .registerTypesIn(path.join(__dirname, "types"))
    .registerCommandsIn(path.join(__dirname, "commands"));

client.login(env("BOT_TOKEN", ""));
