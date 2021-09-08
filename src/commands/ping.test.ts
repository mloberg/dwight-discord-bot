import { CommandInteraction } from 'discord.js';

import ping from './ping';

jest.mock('discord.js');

describe('/ping', () => {
    it('is a slash command', () => {
        expect(ping).toMatchSnapshot();
    });

    it('replies', async () => {
        const command = new CommandInteraction({} as never, {} as never);
        await ping.handle(command);
        expect(command.reply).toHaveBeenCalledWith('🏓');
    });
});
