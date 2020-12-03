import { Client, Guild, Message, TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import command, { madness } from './madness';

const mocks = {
    users: jest.fn(),
    author: jest.fn(),
    send: jest.fn(),
};

const { Collection } = jest.requireActual('discord.js');

jest.mock('discord.js', () => ({
    Client: jest.fn(),
    Guild: jest.fn(),
    TextChannel: jest.fn(),
    Collection: jest.fn(),
    Message: jest.fn().mockImplementation(() => {
        return {
            mentions: {
                users: {
                    filter: mocks.users,
                },
            },
            author: {
                send: mocks.author,
            },
        };
    }),
}));

describe('_madness configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('madness');
        expect(command.description).toEqual('Give a random madness to a player');
        expect(command.usage).toEqual('[short|long|flaw] ...@user');
    });

    it('should have no aliases', () => {
        expect(command.alias).toBeUndefined();
    });
});

describe('_madness', () => {
    const userRegex = /(.*) This lasts (\d+) (.*)\./;
    const authorRegex = /(.*) got the following madness: (.*) This lasts (\d+) (.*)\./;
    let message: Message;

    beforeEach(() => {
        mocks.users.mockClear();
        mocks.send.mockClear();
        mocks.author.mockClear();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('sends a user a madness', async () => {
        const users = new Collection();
        users.set('1', { username: 'jdoe', send: mocks.send });
        users.set('2', { username: 'foo', send: jest.fn() });
        mocks.users.mockReturnValue(users);

        await command.run(message, { $0: 'madness', _: [] });

        expect(mocks.author).toHaveBeenCalledTimes(2);
        expect(mocks.send).toHaveBeenCalledTimes(1);
        expect(users.get('2').send).toHaveBeenCalledTimes(1);

        const userMessage: string = mocks.send.mock.calls[0][0];
        const userMatch = userMessage.match(userRegex);
        if (!userMatch) {
            throw new Error('unexpected message format');
        }

        expect(madness.short.options).toContain(userMatch[1]);
        expect(Number(userMatch[2])).toBeGreaterThanOrEqual(1);
        expect(Number(userMatch[2])).toBeLessThanOrEqual(10);
        expect(userMatch[3]).toEqual('minutes');

        const authorMessage: string = mocks.author.mock.calls[0][0];
        const authorMatch = authorMessage.match(authorRegex);
        if (!authorMatch) {
            throw new Error('unexpected message format');
        }

        expect(authorMatch[1]).toBe('jdoe');
        expect(authorMatch[2]).toBe(userMatch[1]);
        expect(authorMatch[3]).toBe(userMatch[2]);
    });

    it('sends a user a type of madness', async () => {
        const users = new Collection();
        users.set('', { username: 'jdoe', send: mocks.send });
        mocks.users.mockReturnValue(users);

        await command.run(message, { $0: 'madness', _: ['LONG'] });

        const userMessage: string = mocks.send.mock.calls[0][0];
        const userMatch = userMessage.match(userRegex);
        if (!userMatch) {
            throw new Error('unexpected message format');
        }

        expect(madness.long.options).toContain(userMatch[1]);
        expect(Number(userMatch[2])).toBeGreaterThanOrEqual(10);
        expect(Number(userMatch[2])).toBeLessThanOrEqual(100);
        expect(userMatch[3]).toEqual('hours');

        const authorMessage: string = mocks.author.mock.calls[0][0];
        const authorMatch = authorMessage.match(authorRegex);
        if (!authorMatch) {
            throw new Error('unexpected message format');
        }

        expect(authorMatch[1]).toBe('jdoe');
        expect(authorMatch[2]).toBe(userMatch[1]);
        expect(authorMatch[3]).toBe(userMatch[2]);
    });

    it('can send to multiple users', async () => {
        const user2 = jest.fn();
        const users = new Collection();
        users.set('1', { username: 'jdoe', send: mocks.send });
        users.set('2', { username: 'foo', send: user2 });
        mocks.users.mockReturnValue(users);
    });

    it('throws an error if no user is given', async () => {
        try {
            mocks.users.mockReturnValue(new Collection());
            await command.run(message, { $0: 'madness', _: [] });

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual('You must assign a madness to a user.');
        }
    });
});
