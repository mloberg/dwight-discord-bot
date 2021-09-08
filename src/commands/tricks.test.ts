import { CommandInteraction } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import { FriendlyError } from '../error';
import tricks from './tricks';

jest.mock('discord.js', () => ({
    CommandInteraction: jest.fn().mockImplementation(() => ({
        reply: jest.fn(),
        options: {
            getString: jest.fn(),
            getInteger: jest.fn(),
        },
    })),
}));

describe('/tricks', () => {
    it('is a slash command', () => {
        expect(tricks).toMatchSnapshot();
    });

    it('returns a creature', async () => {
        const command = mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getString.mockReturnValue('rust');

        await tricks.handler(command);
        expect(command.reply).toHaveBeenCalledWith(expect.any(String));
    });

    it('returns a create for a dice roll', async () => {
        const command = mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getString.mockReturnValue('gray');
        command.options.getInteger.mockReturnValue(3);

        await tricks.handler(command);
        expect(command.reply).toHaveBeenCalledWith('Badger');
    });

    it('throws an error if no creature is found', async () => {
        const command = mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getString.mockReturnValue('tan');
        command.options.getInteger.mockReturnValue(20);

        await expect(tricks.handler(command)).rejects.toMatchError(
            new FriendlyError('Unable to pull from the Bag of Tricks.'),
        );
    });
});
