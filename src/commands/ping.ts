import Command from '../command';

export default new Command({
    name: 'ping',
    description: 'Pong',
    async run(message) {
        return message.react('🏓');
    },
});
