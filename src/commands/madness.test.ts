import { Message } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import { FriendlyError } from '../error';
import command, { madness } from './madness';

const { Collection } = jest.requireActual('discord.js');

jest.mock('discord.js', () => ({
    Message: jest.fn().mockImplementation(() => ({
        mentions: {
            users: {
                filter: jest.fn(),
            },
        },
        author: {
            send: jest.fn(),
        },
    })),
}));

describe('_madness configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('madness');
        expect(command.description).toEqual('Give a random madness to a player');
        expect(command.usage).toEqual('[short|long|flaw] <...@user>');
    });

    it('should have an alias', () => {
        expect(command.alias).toContain('flaw');
    });
});

describe('_madness', () => {
    const userRegex = /(.*) This lasts (\d+) (.*)\./;
    const authorRegex = /(.*) got the following madness: (.*) This lasts (\d+) (.*)\./;

    it('sends a user a madness', async () => {
        const users = new Collection();
        users.set('1', { username: 'jdoe', send: jest.fn() });
        users.set('2', { username: 'foo', send: jest.fn() });

        const message = mocked(new Message({} as never, {} as never), true);
        message.mentions.users.filter.mockReturnValue(users);

        await command.run(message, { command: 'madness', args: [], match: [], groups: {} });

        expect(message.author.send).toHaveBeenCalledTimes(2);
        expect(users.get('1').send).toHaveBeenCalledTimes(1);
        expect(users.get('2').send).toHaveBeenCalledTimes(1);

        const userMessage: string = users.get('1').send.mock.calls[0][0];
        const userMatch = userMessage.match(userRegex);
        if (!userMatch) {
            throw new Error('unexpected message format');
        }

        expect(madness.short.options).toContain(userMatch[1]);
        expect(Number(userMatch[2])).toBeGreaterThanOrEqual(1);
        expect(Number(userMatch[2])).toBeLessThanOrEqual(10);
        expect(userMatch[3]).toEqual('minutes');

        const authorMessage = message.author.send.mock.calls[0][0] as string;
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
        users.set('', { username: 'jdoe', send: jest.fn() });

        const message = mocked(new Message({} as never, {} as never), true);
        message.mentions.users.filter.mockReturnValue(users);

        await command.run(message, { command: 'madness', args: [], match: [], groups: { type: 'LONG' } });

        const userMessage = mocked(users.get('').send).mock.calls[0][0];
        const userMatch = userMessage.match(userRegex);
        if (!userMatch) {
            throw new Error('unexpected message format');
        }

        expect(madness.long.options).toContain(userMatch[1]);
        expect(Number(userMatch[2])).toBeGreaterThanOrEqual(10);
        expect(Number(userMatch[2])).toBeLessThanOrEqual(100);
        expect(userMatch[3]).toEqual('hours');

        const authorMessage = message.author.send.mock.calls[0][0] as string;
        const authorMatch = authorMessage.match(authorRegex);
        if (!authorMatch) {
            throw new Error('unexpected message format');
        }

        expect(authorMatch[1]).toBe('jdoe');
        expect(authorMatch[2]).toBe(userMatch[1]);
        expect(authorMatch[3]).toBe(userMatch[2]);
    });

    it('can send flaw', async () => {
        const users = new Collection();
        users.set('1', { username: 'jdoe', send: jest.fn() });

        const message = mocked(new Message({} as never, {} as never), true);
        message.mentions.users.filter.mockReturnValue(users);

        await command.run(message, { command: 'flaw', args: [], match: [], groups: {} });
        expect(message.author.send).toHaveBeenCalled();
        expect(users.get('1').send).toHaveBeenCalledWith(expect.stringMatching(/^You gain the following flaw:/));
    });

    it('throws an error if no user is given', async () => {
        const message = mocked(new Message({} as never, {} as never), true);
        message.mentions.users.filter.mockReturnValue(new Collection());

        try {
            await command.run(message, { command: 'madness', args: [], match: [], groups: {} });

            fail('expected error to be thrown');
        } catch (err) {
            expect(err).toBeInstanceOf(FriendlyError);
            expect(err.message).toEqual('You must assign a madness to a user.');
        }
    });
});
