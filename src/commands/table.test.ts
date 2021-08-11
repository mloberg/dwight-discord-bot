import { Message } from 'discord.js';

import { FriendlyError } from '../error';
import command from './table';

jest.mock('discord.js');
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
    it('returns a value from the given table', async () => {
        const message = new Message({} as never, {} as never);
        await command.run(message, { command: 'table', args: ['a'], match: [], groups: {} });

        expect(message.delete).toBeCalledTimes(1);
        expect(message.reply).toBeCalledTimes(1);
        expect(message.reply).toHaveBeenCalledWith('foo');
    });

    it('returns a value for a dice roll', async () => {
        const message = new Message({} as never, {} as never);
        await command.run(message, { command: 'table', args: ['b', '99'], match: [], groups: {} });

        expect(message.delete).toBeCalledTimes(1);
        expect(message.reply).toBeCalledTimes(1);
        expect(message.reply).toHaveBeenCalledWith('test');
    });

    it('returns a resolved value', async () => {
        const message = new Message({} as never, {} as never);
        await command.run(message, { command: 'table', args: ['C'], match: [], groups: {} });

        expect(message.delete).toBeCalledTimes(1);
        expect(message.reply).toBeCalledTimes(1);
        expect(message.reply).toHaveBeenCalledWith('baz');
    });

    it('throws an error if invalid table given', async () => {
        const message = new Message({} as never, {} as never);

        try {
            await command.run(message, { command: 'table', args: [], match: [], groups: {} });
            fail('expected error to be thrown');
        } catch (err) {
            expect(err).toBeInstanceOf(FriendlyError);
            expect(err.message).toEqual('Unknown table "-".');
        }
    });
});
