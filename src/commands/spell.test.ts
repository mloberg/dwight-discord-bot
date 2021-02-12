import { Client, Guild, Message, TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import command from './spell';

const mocks = {
    reply: jest.fn(),
};

jest.mock('discord.js', () => ({
    Client: jest.fn(),
    Guild: jest.fn(),
    TextChannel: jest.fn(),
    Collection: jest.fn(),
    Message: jest.fn().mockImplementation(() => ({
        reply: mocks.reply,
    })),
}));
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
    let message: Message;

    beforeEach(() => {
        mocks.reply.mockClear();
        mocks.reply.mockReturnThis();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('returns a random spell', async () => {
        await command.run(message, { command: 'spell', args: [], match: [], groups: {} });

        const spell = mocks.reply.mock.calls[0][0];
        expect(['Debugger', 'Foo', 'Bar']).toContainEqual(spell);
    });

    it('returns a spell filtered by level', async () => {
        await command.run(message, { command: 'spell', args: [], match: [], groups: { level: '0' } });
        expect(mocks.reply).toHaveBeenLastCalledWith('Foo');

        await command.run(message, { command: 'spell', args: [], match: [], groups: { level: 'Cantrip' } });
        expect(mocks.reply).toHaveBeenLastCalledWith('Foo');

        expect(mocks.reply).toHaveBeenCalledTimes(2);
    });

    it('returns a filtered spell', async () => {
        await command.run(message, {
            command: 'spell',
            args: [],
            match: [],
            groups: { school: 'Evocation', class: 'Wizard' },
        });
        expect(mocks.reply).toHaveBeenLastCalledWith('Debugger');

        await command.run(message, {
            command: 'spell',
            args: [],
            match: [],
            groups: { level: '5', class: 'Cleric', school: 'Divination' },
        });
        expect(mocks.reply).toHaveBeenLastCalledWith('Bar');
    });

    it('throws an error when no item matches', async () => {
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
