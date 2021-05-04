import { Client, Guild, Message, TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import command from './table';

const mocks = {
    delete: jest.fn(),
    reply: jest.fn(),
};

jest.mock('discord.js', () => ({
    Client: jest.fn(),
    Guild: jest.fn(),
    TextChannel: jest.fn(),
    Collection: jest.fn(),
    Message: jest.fn().mockImplementation(() => ({
        delete: mocks.delete,
        reply: mocks.reply,
    })),
}));
jest.mock('../data/table', () => ({
    a: new Array(100).fill('foo'),
    b: [...new Array(98).fill('bar'), 'test', 'foobar'],
    c: new Array(100).fill(() => 'baz'),
}));

describe('_table configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('table');
        expect(command.description).toEqual('Roll on the magic item tables');
        expect(command.usage).toEqual('<table> [d100]');
        expect(command.alias).toEqual([]);
    });
});

describe('_table', () => {
    let message: Message;

    beforeEach(() => {
        mocks.delete.mockClear();
        mocks.reply.mockClear();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('returns a value from the given table', async () => {
        await command.run(message, { command: 'table', args: ['a'], match: [], groups: {} });

        expect(mocks.delete).toBeCalledTimes(1);
        expect(mocks.reply).toBeCalledTimes(1);
        expect(mocks.reply).toHaveBeenCalledWith('foo');
    });

    it('returns a value for a dice roll', async () => {
        await command.run(message, { command: 'table', args: ['b', '99'], match: [], groups: {} });

        expect(mocks.delete).toBeCalledTimes(1);
        expect(mocks.reply).toBeCalledTimes(1);
        expect(mocks.reply).toHaveBeenCalledWith('test');
    });

    it('returns a resolved value', async () => {
        await command.run(message, { command: 'table', args: ['C'], match: [], groups: {} });

        expect(mocks.delete).toBeCalledTimes(1);
        expect(mocks.reply).toBeCalledTimes(1);
        expect(mocks.reply).toHaveBeenCalledWith('baz');
    });

    it('throws an error if invalid table given', async () => {
        try {
            await command.run(message, { command: 'table', args: [], match: [], groups: {} });
            fail('expected error to be thrown');
        } catch (err) {
            expect(err).toBeInstanceOf(FriendlyError);
            expect(err.message).toEqual('Unknown table "-".');
        }
    });
});
