import { CommandInteraction, User } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import madness from './madness';

jest.mock('discord.js', () => ({
    User: jest.fn().mockImplementation(() => ({
        send: jest.fn(),
    })),
    CommandInteraction: jest.fn().mockImplementation(() => ({
        reply: jest.fn(),
        options: {
            getString: jest.fn(),
            getInteger: jest.fn(),
            getUser: jest.fn(),
        },
    })),
}));

describe('/madness', () => {
    it('is a slash command', () => {
        expect(madness).toMatchSnapshot();
    });

    it('returns a random madness', async () => {
        const user = new User({} as never, {} as never);
        const command = mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getString.mockReturnValue('short');
        command.options.getUser.mockReturnValue(user);

        await madness.handle(command);

        const content = expect.stringMatching(/^.*\. This lasts \d+ minutes\.$/);
        expect(user.send).toHaveBeenCalledWith(content);
        expect(command.reply).toHaveBeenCalledWith({ content, ephemeral: true });
    });

    it('returns a madness based on a roll', async () => {
        const command = mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getString.mockReturnValue('flaw');
        command.options.getInteger.mockReturnValue(16);

        await madness.handle(command);
        expect(command.reply).toHaveBeenCalledWith({
            content: 'You gain the following flaw: "I keep whatever I find." This lasts until cured.',
            ephemeral: true,
        });
    });
});
