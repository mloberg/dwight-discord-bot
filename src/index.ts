import { Client } from "discord.js";
import parser from "yargs-parser";

import Command from "./command";
import commands from "./commands";

const prefix = process.env.BOT_PREFIX || "^";
const client = new Client();

client.once("ready", () => {
    console.log("Ready!");
    client.user.setActivity("Assistant to the Dungeon Master");
});

client.on("error", console.error);

client.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const input = message.content.slice(prefix.length).split(/ +/);
    const commandName = input.shift().toLowerCase();

    const command: Command = commands.get(commandName);
    if (!command) {
        return;
    }

    const args = parser(input, command.parserOptions);

    try {
        await command.run(message, args);
    } catch (err) {
        console.log(err);
        message.reply(`I encountered an error: ${err.message}`);
    }
});

client.login(process.env.BOT_TOKEN);
