import { CommandInteraction } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import { FriendlyError } from '../error';
import convert from './35';

jest.mock('discord.js', () => ({
    CommandInteraction: jest.fn().mockImplementation(() => ({
        reply: jest.fn(),
        options: {
            getString: jest.fn(),
        },
    })),
}));

describe('/35', () => {
    it('is a slash command', () => {
        expect(convert).toMatchSnapshot();
    });

    it.each([
        ['use rope', 'DEX (Acrobatics)'],
        ['Use Magic Device', 'INT (Arcana)'],
        ['Ride', 'WIS (Animal Handling) or DEX (Acrobatics)'],
    ])('returns a comprable 5e skill for %s', async (skill, result) => {
        const command = mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getString.mockReturnValue(skill);

        await convert.run(command);
        expect(command.reply).toHaveBeenCalledWith(result);
    });

    it('throws errors on invalid skill', async () => {
        const command = mocked(new CommandInteraction({} as never, {} as never), true);

        await expect(convert.run(command)).rejects.toThrowError(new FriendlyError('I couldn\'t find skill "".'));
    });
});
