import { Message } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import { FriendlyError } from '../error';
import command from './spell';

jest.mock('discord.js');
jest.mock('../data/spells', () => {
    return () => [
        {
            spell: 'Debugger',
            level: 1,
            school: 'Evocation',
            class: ['Wizard'],
        },
        {
            spell: 'Foo',
            level: 0,
            school: 'Illusion',
            class: ['Warlock', 'Ranger'],
        },
        {
            spell: 'Bar',
            level: 5,
            school: 'Divination',
            class: ['Bard', 'Cleric'],
        },
    ];
});

describe('_spell configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('spell');
        expect(command.description).toEqual('Return a random spell');
        expect(command.usage).toEqual('[level] [class] [school]');
    });

    it('should have an alias', () => {
        expect(command.alias).toContain('spells');
    });
});

describe('_spell', () => {
    it('returns a random spell', async () => {
        const message = mocked(new Message({} as never, {} as never));
        await command.run(message, { command: 'spell', args: [], match: [], groups: {} });

        const spell = message.reply.mock.calls[0][0];
        expect(['Debugger', 'Foo', 'Bar']).toContainEqual(spell);
    });

    it('returns a spell filtered by level', async () => {
        const message = new Message({} as never, {} as never);

        await command.run(message, { command: 'spell', args: [], match: [], groups: { level: '0' } });
        expect(message.reply).toHaveBeenLastCalledWith('Foo');

        await command.run(message, { command: 'spell', args: [], match: [], groups: { level: 'Cantrip' } });
        expect(message.reply).toHaveBeenLastCalledWith('Foo');

        expect(message.reply).toHaveBeenCalledTimes(2);
    });

    it('returns a filtered spell', async () => {
        const message = new Message({} as never, {} as never);

        await command.run(message, {
            command: 'spell',
            args: [],
            match: [],
            groups: { school: 'Evocation', class: 'Wizard' },
        });
        expect(message.reply).toHaveBeenLastCalledWith('Debugger');

        await command.run(message, {
            command: 'spell',
            args: [],
            match: [],
            groups: { level: '5', class: 'Cleric', school: 'Divination' },
        });
        expect(message.reply).toHaveBeenLastCalledWith('Bar');
    });

    it('throws an error when no item matches', async () => {
        const message = new Message({} as never, {} as never);

        try {
            await command.run(message, {
                command: 'spell',
                args: [],
                match: [],
                groups: { level: '5', class: 'Ranger' },
            });
            fail('expected error to be thrown');
        } catch (err) {
            expect(err).toBeInstanceOf(FriendlyError);
            expect(err.message).toEqual("I couldn't find a spell matching those parameters.");
        }
    });
});
