import { Client, Collection, Guild, Message, TextChannel } from 'discord.js';

import command, { madness } from '../../src/commands/madness';
import { FriendlyError } from '../../src/error';

const mocks = {
    size: 0,
    user: jest.fn(),
    author: jest.fn(),
    username: 'jdoe',
};

jest.mock('discord.js', () => {
    return {
        Client: jest.fn(),
        Guild: jest.fn(),
        TextChannel: jest.fn(),
        Collection: jest.fn(),
        Message: jest.fn().mockImplementation(() => {
            return {
                mentions: {
                    users: {
                        get size() {
                            return mocks.size;
                        },
                        first() {
                            return {
                                username: mocks.username,
                                send: mocks.user,
                            };
                        },
                    },
                },
                author: {
                    send: mocks.author,
                },
            };
        }),
    };
});

describe('_madness configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('madness');
        expect(command.description).toEqual('Give a random madness to a player');
        expect(command.usage).toEqual('[short|long|flaw] @user');
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
        mocks.size = 0;
        mocks.user.mockClear();
        mocks.author.mockClear();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('sends a user a madness', async () => {
        mocks.size = 1;
        await command.run(message, { _: [] }, new Collection());

        const userMessage: string = mocks.user.mock.calls[0][0];
        const userMatch = userMessage.match(userRegex);

        expect(madness.short.options).toContain(userMatch[1]);
        expect(Number(userMatch[2])).toBeGreaterThanOrEqual(1);
        expect(Number(userMatch[2])).toBeLessThanOrEqual(10);
        expect(userMatch[3]).toEqual('minutes');

        const authorMessage: string = mocks.author.mock.calls[0][0];
        const authorMatch = authorMessage.match(authorRegex);

        expect(authorMatch[1]).toBe(mocks.username);
        expect(authorMatch[2]).toBe(userMatch[1]);
        expect(authorMatch[3]).toBe(userMatch[2]);
    });

    it('sends a user a type of madness', async () => {
        mocks.size = 1;
        await command.run(message, { _: ['LONG'] }, new Collection());

        const userMessage: string = mocks.user.mock.calls[0][0];
        const userMatch = userMessage.match(userRegex);

        expect(madness.long.options).toContain(userMatch[1]);
        expect(Number(userMatch[2])).toBeGreaterThanOrEqual(10);
        expect(Number(userMatch[2])).toBeLessThanOrEqual(100);
        expect(userMatch[3]).toEqual('hours');

        const authorMessage: string = mocks.author.mock.calls[0][0];
        const authorMatch = authorMessage.match(authorRegex);

        expect(authorMatch[1]).toBe(mocks.username);
        expect(authorMatch[2]).toBe(userMatch[1]);
        expect(authorMatch[3]).toBe(userMatch[2]);
    });

    it('can send a flaw', async () => {
        mocks.size = 1;
        await command.run(message, { _: ['flaw'] }, new Collection());

        const userMessage: string = mocks.user.mock.calls[0][0];
        const userMatch = userMessage.match(/(.*) This lasts until cured\./);

        expect(madness.flaw.options).toContain(userMatch[1]);
    });

    it('throws an error if no user is given', async () => {
        try {
            await command.run(message, { _: [] }, new Collection());

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual('You must assign a madness to a user.');
        }
    });
});
