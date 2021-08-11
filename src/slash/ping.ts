import { SlashCommand } from '../types';

const ping: SlashCommand = {
    name: 'ping',
    description: 'pong',
    async run(command) {
        await command.reply('🏓');
    },
};

export default ping;
