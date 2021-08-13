import { Message } from 'discord.js';

import { FriendlyError } from '../error';
import { help } from '.';

jest.mock('discord.js', () => ({
    Message: jest.fn().mockImplementation(() => ({
        channel: {
            send: jest.fn(),
        },
    })),
}));

describe('_help configuration', () => {
    it('should have basic command infomation', () => {
        expect(help.name).toEqual('help');
        expect(help.description).toEqual('Get help with commands');
        expect(help.usage).toEqual('[command]');
    });

    it('should have an alias', () => {
        expect(help.alias).toContain('commands');
    });
});

describe('_help', () => {
    it('returns a list of all commands', async () => {
        const message = new Message({} as never, {} as never);

        await help.run(message, { command: 'help', args: [], match: [], groups: {} });
        expect(message.channel.send).toMatchSnapshot();
    });

    it.each(['help', 'ping'])('returns the details for the %s command', async (cmd) => {
        const message = new Message({} as never, {} as never);

        await help.run(message, { command: 'help', args: [cmd], match: [], groups: {} });
        expect(message.channel.send).toMatchSnapshot();
    });

    it('returns an error if an invalid command is given', async () => {
        const message = new Message({} as never, {} as never);

        try {
            await help.run(message, { command: 'help', args: ['invalid'], match: [], groups: {} });

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual('No command for "invalid" found.');
        }
    });
});
