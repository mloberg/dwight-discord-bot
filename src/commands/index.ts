import Command, { Manager } from '../command';
import config from '../config';
import { FriendlyError } from '../error';
import elixir from './elixir';
import event from './event';
import item from './item';
import madness from './madness';
import ping from './ping';
import portent from './portent';
import spell from './spell';
import table from './table';
import treasure from './treasure';
import wildMagic from './wildMagic';

const commands = new Manager();

export const help = new Command({
    name: 'help',
    description: 'Get help with commands',
    alias: ['commands', 'usage'],
    usage: '[command]',
    async run(message, { args }) {
        if (!args.length) {
            return message.channel.send(
                [
                    'Here is a list of available commands:',
                    commands.list().join(', '),
                    `Get more details with "${config.prefix}help ${this.usage}"`,
                ].join('\n'),
            );
        }

        const name = args[0].toString().toLowerCase();
        const command = commands.get(name);

        if (!command) {
            throw new FriendlyError(`No command for "${name}" found.`);
        }

        return message.channel.send(command.help(config.prefix));
    },
});

commands.register(help);
commands.register(elixir);
commands.register(event);
commands.register(item);
commands.register(madness);
commands.register(ping);
commands.register(portent);
commands.register(spell);
commands.register(table);
commands.register(treasure);
commands.register(wildMagic);

export default commands;
