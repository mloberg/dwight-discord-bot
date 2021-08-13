import Command, { Manager } from '../command';
import config from '../config';
import { FriendlyError } from '../error';
import ping from './ping';
import portent from './portent';

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
commands.register(ping);
commands.register(portent);

export default commands;
