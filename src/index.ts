import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import parser from 'yargs-parser';

import { Command } from './types';
import { env } from './utils';

const client = new Client();
const commands = new Collection<string, Command>();

const prefix = env('BOT_PREFIX', '__');

client.once('ready', () => {
    client.user.setActivity('Assistant to the Dungeon Master');

    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
});

const commandFiles = readdirSync(`${__dirname}/commands`).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const command: Command = require(`${__dirname}/commands/${file}`).default;
    commands.set(command.name, command);
}

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = parser(message.content.slice(prefix.length).trim());
    const commandName = args._.shift().toString();

    const command = commands.get(commandName) || commands.find((cmd) => cmd.alias && cmd.alias.includes(commandName));

    if (!command) {
        return;
    }

    try {
        await command.run(message, args, commands);
    } catch (err) {
        // add command usage to output?
        message.reply(`That broke me. ${err.toString()}`);
        console.log(err);
    }
});

client.login(env('BOT_TOKEN', ''));
