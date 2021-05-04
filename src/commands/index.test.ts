import { Client, Guild, Message, TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import { help } from '.';

const mocks = {
    send: jest.fn(),
};

jest.mock('discord.js', () => ({
    Client: jest.fn(),
    Guild: jest.fn(),
    TextChannel: jest.fn(),
    Message: jest.fn().mockImplementation(() => ({
        channel: {
            send: mocks.send,
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
    let message: Message;

    beforeEach(() => {
        mocks.send.mockClear();
        mocks.send.mockReturnThis();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('returns a list of all commands', async () => {
        await help.run(message, { command: 'help', args: [], match: [], groups: {} });
        expect(mocks.send).toMatchSnapshot();
    });

    it.each(['help', 'treasure', 'event'])('returns the details for the %s command', async (cmd) => {
        await help.run(message, { command: 'help', args: [cmd], match: [], groups: {} });
        expect(mocks.send).toMatchSnapshot();
    });

    it('returns an error if an invalid command is given', async () => {
        try {
            await help.run(message, { command: 'help', args: ['invalid'], match: [], groups: {} });

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual('No command for "invalid" found.');
        }
    });
});
