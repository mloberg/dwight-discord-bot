import { Command } from '../types';

const command: Command = {
    name: 'ping',
    description: 'Pong',
    async run(message) {
        return message.react('🏓');
    },
};

export default command;
