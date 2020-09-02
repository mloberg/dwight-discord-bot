import { Client, Guild, Message, TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import { Commands, help } from '.';

const mocks = {
    send: jest.fn(),
};

jest.mock('discord.js', () => {
    return {
        Client: jest.fn(),
        Guild: jest.fn(),
        TextChannel: jest.fn(),
        Message: jest.fn().mockImplementation(() => {
            return {
                channel: {
                    send: mocks.send,
                },
            };
        }),
    };
});

describe('_help configuration', () => {
    it('should have basic command infomation', () => {
        expect(help.name).toEqual('help');
        expect(help.description).toEqual('Get help with commands');
        expect(help.usage).toEqual('[COMMAND]');
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
        const reply = await help.run(message, { _: [] });

        expect(reply).toEqual(message.channel);
        expect(mocks.send).toMatchSnapshot();
    });

    it.each(['help', 'treasure', 'event'])('returns the details for the %s command', async (cmd) => {
        const reply = await help.run(message, { _: [cmd] });

        expect(reply).toEqual(message.channel);
        expect(mocks.send).toMatchSnapshot();
    });

    it('returns an error if an invalid command is given', async () => {
        try {
            await help.run(message, { _: ['invalid'] });

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual('No command for "invalid" found.');
        }
    });
});

describe('Commands', () => {
    it('registers commands and their aliases', () => {
        const commands = new Commands();
        expect(commands.list()).toHaveLength(0);

        commands.register(help);
        expect(commands.list()).toHaveLength(1);
    });

    it('returns the correct command', () => {
        const commands = new Commands();
        commands.register(help);

        expect(commands.get('help')).toEqual(help);
        expect(commands.get('commands')).toEqual(help);
        expect(commands.get('foo')).toBeNull();
    });
});
