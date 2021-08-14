import { CommandBuilder } from '../command';

export default new CommandBuilder(async (command) => {
    await command.reply('🏓');
})
    .setName('ping')
    .setDescription('Pong');
