import { Client, Guild, Message, TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import command from './treasure';

const mocks = {
    delete: jest.fn(),
    send: jest.fn(),
};

jest.mock('discord.js', () => ({
    Client: jest.fn(),
    Guild: jest.fn(),
    TextChannel: jest.fn(),
    Collection: jest.fn(),
    Message: jest.fn().mockImplementation(() => ({
        delete: mocks.delete,
        channel: {
            send: mocks.send,
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
    let message: Message;

    beforeEach(() => {
        mocks.delete.mockClear();
        mocks.send.mockClear();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('returns individual treasure', async () => {
        await command.run(message, { command: 'treasure', args: [], match: [], groups: { cr: '1' } });

        expect(mocks.delete).toBeCalledTimes(1);
        expect(mocks.send).toHaveBeenCalledWith(expect.arrayContaining(['You found:']), { split: true });
    });

    it('returns individual treasure for a dice roll', async () => {
        await command.run(message, { command: 'treasure', args: [], match: [], groups: { cr: '17', roll: '99' } });

        expect(mocks.delete).toBeCalledTimes(1);

        const treasure = mocks.send.mock.calls[0];
        expect(treasure[0].length).toEqual(3);
        expect(treasure[0][0]).toEqual('You found:');
        expect(treasure[0][1]).toMatch(/\d+ gp/);
        expect(treasure[0][2]).toMatch(/\d+ pp/);
        expect(treasure[1]).toEqual({ split: true });
    });

    it('returns a treasure hoard', async () => {
        await command.run(message, { command: 'treasure', args: [], match: [], groups: { cr: '4', hoard: 'hoard' } });

        expect(mocks.delete).toBeCalledTimes(1);

        const treasure = mocks.send.mock.calls[0];
        expect(treasure[0].length).toBeGreaterThanOrEqual(3);
        expect(treasure[0][0]).toEqual('You found:');
        expect(treasure[1]).toEqual({ split: true });
    });

    it('returns a treasure hoard with dice roll', async () => {
        await command.run(message, {
            command: 'treasure',
            args: [],
            match: [],
            groups: { cr: '12', roll: '99', hoard: 'hoard' },
        });

        expect(mocks.delete).toBeCalledTimes(1);

        const treasure = mocks.send.mock.calls[0];
        expect(treasure[0].length).toBeGreaterThanOrEqual(3);
        expect(treasure[0][0]).toEqual('You found:');
        expect(treasure[0].join(' ')).toContain('Item: ');
        expect(treasure[1]).toEqual({ split: true });
    });

    it('throws an error if no CR given', async () => {
        try {
            await command.run(message, { command: 'treasure', args: [], match: [], groups: {} });
            fail('expected error to be thrown');
        } catch (err) {
            expect(err).toBeInstanceOf(FriendlyError);
            expect(err.message).toEqual('Missing challenge rating');
        }
    });
});
