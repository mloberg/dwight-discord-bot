import ping from './ping';

jest.mock('discord.js');

describe('/ping', () => {
    it('is a slash command', () => {
        expect(ping).toMatchSnapshot();
    });

    it('replies', async () => {
        const command = createMockCommand();
        await ping.handle(command);
        expect(command.reply).toHaveBeenCalledWith('🏓');
    });
});
