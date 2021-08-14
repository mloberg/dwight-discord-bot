import { CommandInteraction } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import elixir, { elixirs } from './elixir';

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
        const command = mocked(new CommandInteraction({} as never, {} as never));

        await elixir.handler(command);
        expect(elixirs).toContainEqual(command.reply.mock.calls[0][0]);
    });

    it('returns an elixir for a dice roll', async () => {
        const command = mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getInteger.mockReturnValue(1);

        await elixir.handler(command);
        expect(command.reply).toHaveBeenCalledWith(
            '**Healing**. The drinker regains a number of hit points equal to 2d4 + your Intelligence modifier.',
        );
    });
});
