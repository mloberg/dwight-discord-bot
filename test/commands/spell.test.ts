import { Client, Guild, Message, TextChannel } from 'discord.js';

import command from '../../src/commands/spell';
import { FriendlyError } from '../../src/error';

const mocks = {
    reply: jest.fn(),
};

jest.mock('discord.js', () => {
    return {
        Client: jest.fn(),
        Guild: jest.fn(),
        TextChannel: jest.fn(),
        Collection: jest.fn(),
        Message: jest.fn().mockImplementation(() => {
            return {
                reply: mocks.reply,
            };
        }),
    };
});
jest.mock('../../src/data/spells', () => {
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
        expect(command.usage).toEqual('[--level] LEVEL [--class] CLASS [--school] SCHOOL');
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
        const reply = await command.run(message, { _: [] });

        expect(reply).toBe(message);

        const spell = mocks.reply.mock.calls[0][0];
        expect(['Debugger', 'Foo', 'Bar']).toContainEqual(spell);
    });

    it('returns a spell filtered by level', async () => {
        const one = await command.run(message, { _: [], level: 0 });
        const two = await command.run(message, { _: [], level: 'Cantrip' });

        expect(one).toEqual(message);
        expect(two).toEqual(message);

        expect(mocks.reply.mock.calls[0][0]).toBe('Foo');
        expect(mocks.reply.mock.calls[1][0]).toBe('Foo');
    });

    it('returns a filtered spell', async () => {
        const one = await command.run(message, { _: [], school: 'Evocation', class: 'Wizard' });
        const two = await command.run(message, { _: [5, 'Cleric', 'Divination'] });

        expect(one).toEqual(message);
        expect(two).toEqual(message);

        expect(mocks.reply.mock.calls[0][0]).toBe('Debugger');
        expect(mocks.reply.mock.calls[1][0]).toBe('Bar');
    });

    it('throws an error when no item matches', async () => {
        try {
            await command.run(message, { _: [5, 'Ranger'] });

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual("I couldn't find a spell matching those parameters.");
        }
    });
});
