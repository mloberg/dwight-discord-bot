import { CommandInteraction } from 'discord.js';

import { FriendlyError } from '../error';
import elixir from './elixir';

jest.mock('discord.js', () => ({
    CommandInteraction: jest.fn().mockImplementation(() => ({
        reply: jest.fn(),
        options: {
            getInteger: jest.fn(),
        },
    })),
}));

describe('/elixir', () => {
    it('is a slash command', () => {
        expect(elixir).toMatchSnapshot();
    });

    it('returns a random elixir', async () => {
        const command = jest.mocked(new CommandInteraction({} as never, {} as never));

        await elixir.handle(command);
        expect(command.reply).toHaveBeenCalledWith(expect.any(String));
    });

    it('returns an elixir for a dice roll', async () => {
        const command = jest.mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getInteger.mockReturnValue(1);

        await elixir.handle(command);
        expect(command.reply).toHaveBeenCalledWith(
            '**Healing**. The drinker regains a number of hit points equal to 2d4 + your Intelligence modifier.',
        );
    });

    it('throws an error if no elixir', async () => {
        const command = jest.mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getInteger.mockReturnValue(10);

        await expect(elixir.handle(command)).rejects.toMatchError(new FriendlyError('Unable to craft an elixir.'));
    });
});
