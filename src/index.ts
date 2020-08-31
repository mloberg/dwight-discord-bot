import { Client } from 'discord.js';
import yargs from 'yargs';

import commands from './commands';
import { FriendlyError } from './error';
import { env } from './utils';

const client = new Client();

const prefix = env('BOT_PREFIX', '_');

client.once('ready', () => {
    client.user.setActivity(`Assistant to the Dungeon Master | ${prefix}help`);

    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
});

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = yargs.help(false).parse(message.content.slice(prefix.length).trim());
    const commandName = args._.shift().toString();
    delete args.$0;

    const command = commands.get(commandName);

    if (!command) {
        return;
    }

    try {
        await command.run(message, args);
    } catch (err) {
        if (err instanceof FriendlyError) {
            return message.reply(err.message);
        }

        message.reply('That broke me. Check my logs for details.');
        console.error(err);
    }
});

process.on('unhandledRejection', (reason) => {
    //.throw it and let our exception handler deal with it
    throw reason;
});

process.on('uncaughtException', (err: Error) => {
    console.error(err);
    process.exit(1);
});

client.login(env('BOT_TOKEN', ''));
