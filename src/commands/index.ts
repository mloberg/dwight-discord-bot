import { Message } from 'discord.js';

import { FriendlyError } from '../error';
import { Arguments, Command, Dictionary } from '../types';
import { env } from '../utils';
import conversion from './35';
import event from './event';
import item from './item';
import madness from './madness';
import ping from './ping';
import prune from './prune';
import spell from './spell';
import treasure from './treasure';
import wildMagic from './wildMagic';

const prefix = env('BOT_PREFIX', '_');

export class Commands {
    private commands: Dictionary<Command> = {};

    register(command: Command): void {
        this.commands[command.name] = command;
        (command.alias || []).forEach((alias) => (this.commands[alias] = command));
    }

    get(name: string): Command {
        return this.commands[name] || null;
    }

    list(): string[] {
        return Object.keys(this.commands);
    }
}

export const help: Command = {
    name: 'help',
    description: 'Get help with commands',
    alias: ['commands'],
    usage: '[COMMAND]',
    async run(message: Message, args: Arguments): Promise<Message> {
        if (!args._.length) {
            return message.channel.send(
                [
                    'Here is a list of available commands:',
                    commands.list().join(', '),
                    `Get more details with "${prefix}help [command]"`,
                ],
                { split: true },
            );
        }

        const name = args._[0].toString().toLowerCase();
        const command = commands.get(name);

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

const commands = new Commands();

commands.register(help);
commands.register(conversion);
commands.register(event);
commands.register(item);
commands.register(madness);
commands.register(ping);
commands.register(prune);
commands.register(spell);
commands.register(treasure);
commands.register(wildMagic);

export default commands;
