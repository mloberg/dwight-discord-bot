import { Message } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import { FriendlyError } from '../error';
import command from './treasure';

jest.mock('discord.js', () => ({
    Client: jest.fn(),
    Guild: jest.fn(),
    TextChannel: jest.fn(),
    Collection: jest.fn(),
    Message: jest.fn().mockImplementation(() => ({
        delete: jest.fn(),
        channel: {
            send: jest.fn(),
        },
    })),
}));
jest.mock('../data/spells', () => {
    return () => [
        {
            spell: 'Cantrip',
            level: 0,
            school: 'Illusion',
            class: ['Wizard'],
        },
        {
            spell: 'One',
            level: 1,
            school: 'Illusion',
            class: ['Wizard'],
        },
        {
            spell: 'Two',
            level: 2,
            school: 'Illusion',
            class: ['Wizard'],
        },
        {
            spell: 'Three',
            level: 3,
            school: 'Illusion',
            class: ['Wizard'],
        },
        {
            spell: 'Four',
            level: 4,
            school: 'Illusion',
            class: ['Wizard'],
        },
        {
            spell: 'Five',
            level: 5,
            school: 'Illusion',
            class: ['Wizard'],
        },
        {
            spell: 'Six',
            level: 6,
            school: 'Illusion',
            class: ['Wizard'],
        },
        {
            spell: 'Seven',
            level: 7,
            school: 'Illusion',
            class: ['Wizard'],
        },
        {
            spell: 'Eight',
            level: 8,
            school: 'Illusion',
            class: ['Wizard'],
        },
        {
            spell: 'Nine',
            level: 9,
            school: 'Illusion',
            class: ['Wizard'],
        },
    ];
});

describe('_treasure configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('treasure');
        expect(command.description).toEqual('Give me the loot!');
        expect(command.usage).toEqual('[hoard] <cr> [d100]');
    });

    it('should have an alias', () => {
        expect(command.alias).toContain('loot');
    });
});

describe('_treasure', () => {
    it('returns individual treasure', async () => {
        const message = new Message({} as never, {} as never);
        await command.run(message, { command: 'treasure', args: [], match: [], groups: { cr: '1' } });

        expect(message.delete).toBeCalledTimes(1);
        expect(message.channel.send).toHaveBeenCalledWith(expect.stringMatching(/^You found:/));
    });

    it('returns individual treasure for a dice roll', async () => {
        const message = mocked(new Message({} as never, {} as never), true);
        await command.run(message, { command: 'treasure', args: [], match: [], groups: { cr: '17', roll: '99' } });

        expect(message.delete).toBeCalledTimes(1);
        expect(message.channel.send).toHaveBeenCalledWith(expect.stringMatching(/^You found:/));
        expect(message.channel.send).toHaveBeenCalledWith(expect.stringMatching(/\d+ gp/));
        expect(message.channel.send).toHaveBeenCalledWith(expect.stringMatching(/\d+ pp/));
    });

    it('returns a treasure hoard', async () => {
        const message = mocked(new Message({} as never, {} as never), true);
        await command.run(message, { command: 'treasure', args: [], match: [], groups: { cr: '4', hoard: 'hoard' } });

        expect(message.delete).toBeCalledTimes(1);
        expect(message.channel.send).toHaveBeenCalledWith(expect.stringMatching(/^You found:/));
        expect(message.channel.send).toHaveBeenCalledWith(expect.stringMatching(/(Gem|Art|Item)/));
    });

    it('throws an error if no CR given', async () => {
        const message = new Message({} as never, {} as never);

        try {
            await command.run(message, { command: 'treasure', args: [], match: [], groups: {} });
            fail('expected error to be thrown');
        } catch (err) {
            expect(err).toBeInstanceOf(FriendlyError);
            expect(err.message).toEqual('Missing challenge rating');
        }
    });
});
