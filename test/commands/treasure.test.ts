import { Client, Collection, Guild, Message, TextChannel } from 'discord.js';

import command from '../../src/commands/treasure';
import { FriendlyError } from '../../src/error';

const mocks = {
    delete: jest.fn(),
    send: jest.fn(),
};

jest.mock('discord.js', () => {
    return {
        Client: jest.fn(),
        Guild: jest.fn(),
        TextChannel: jest.fn(),
        Collection: jest.fn(),
        Message: jest.fn().mockImplementation(() => {
            return {
                delete: mocks.delete,
                channel: {
                    send: mocks.send,
                },
            };
        }),
    };
});
jest.mock('../../src/data/spells', () => {
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
        expect(command.usage).toEqual('CR [ROLL] [--hoard]');
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
        await command.run(message, { _: ['1'] }, new Collection());

        expect(mocks.delete).toBeCalledTimes(1);

        const treasure = mocks.send.mock.calls[0];
        expect(treasure[0].length).toEqual(2);
        expect(treasure[0][0]).toEqual('You found:');
        expect(treasure[1]).toEqual({ split: true });
    });

    it('returns individual treasure for a dice roll', async () => {
        await command.run(message, { _: [17, 99] }, new Collection());

        expect(mocks.delete).toBeCalledTimes(1);

        const treasure = mocks.send.mock.calls[0];
        expect(treasure[0].length).toEqual(3);
        expect(treasure[0][0]).toEqual('You found:');
        expect(treasure[0][1]).toMatch(/\d+ gp/);
        expect(treasure[0][2]).toMatch(/\d+ pp/);
        expect(treasure[1]).toEqual({ split: true });
    });

    it('returns a treasure hoard', async () => {
        await command.run(message, { _: [], cr: 4, hoard: true }, new Collection());

        expect(mocks.delete).toBeCalledTimes(1);

        const treasure = mocks.send.mock.calls[0];
        expect(treasure[0].length).toBeGreaterThanOrEqual(3);
        expect(treasure[0][0]).toEqual('You found:');
        expect(treasure[1]).toEqual({ split: true });
    });

    it('returns a treasure hoard with dice roll', async () => {
        await command.run(message, { _: [], cr: 12, roll: 99, hoard: true }, new Collection());

        expect(mocks.delete).toBeCalledTimes(1);

        const treasure = mocks.send.mock.calls[0];
        expect(treasure[0].length).toBeGreaterThanOrEqual(3);
        expect(treasure[0][0]).toEqual('You found:');
        expect(treasure[0].join(' ')).toContain('Item: ');
        expect(treasure[1]).toEqual({ split: true });
    });

    it('throws an error if no CR given', async () => {
        try {
            await command.run(message, { _: [] }, new Collection());

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual('Missing challenge rating');
        }
    });
});
