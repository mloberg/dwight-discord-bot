import { Collection, Message } from 'discord.js';

import { FriendlyError } from '../error';
import { Arguments, Command } from '../types';
import { env } from '../utils';

const prefix = env('BOT_PREFIX', '__');

const command: Command = {
    name: 'help',
    description: 'Get help with commands',
    alias: ['commands'],
    usage: '[COMMAND]',
    async run(message: Message, args: Arguments, commands: Collection<string, Command>): Promise<Message> {
        if (!args._.length) {
            return message.channel.send(
                [
                    'Here is a list of available commands:',
                    commands.map((c) => c.name).join(', '),
                    `Get more details with "${prefix}help [command]"`,
                ],
                { split: true },
            );
        }

        const name = args._[0].toString().toLowerCase();
        const command = commands.get(name) || commands.find((c) => c.alias && c.alias.includes(name));

        if (!command) {
            throw new FriendlyError(`No command for "${name}" found.`);
        }

        const help = [`**${command.name}**: ${command.description}`];
        if (command.alias) {
            help.push(`*aliases*: ${command.alias.join(', ')}`);
        }
        if (command.usage) {
            help.push(`*usage*: \`${prefix}${command.name} ${command.usage}\``);
        }
        if (command.examples) {
            help.push(`*examples*: ${command.examples.map((e) => `\`${prefix}${command.name} ${e}\``).join(', ')}`);
        }

        return message.channel.send(help, { split: true });
    },
};

export default command;
