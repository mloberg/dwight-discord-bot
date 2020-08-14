import { Client, Collection, Guild, Message, TextChannel } from 'discord.js';

import command from '../../src/commands/item';
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
jest.mock('../../src/data/items', () => {
    return () => [
        {
            item: 'IDE of Lesser Bugs',
            type: 'Tool',
            subtype: 'Text Editor',
            rarity: 'Very Rare',
            attunement: 'developer',
        },
        {
            item: 'Phone of Longer Life',
            type: 'Wondrous Item',
            rarity: 'Uncommon',
            attunement: false,
        },
        {
            item: 'Pants of Greater Comfort',
            type: 'Armor',
            rarity: 'Common',
            attunement: true,
        },
    ];
});

describe('__item configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('item');
        expect(command.description).toEqual('Return a random magic item');
    });

    it('should have an alias', () => {
        expect(command.alias).toContain('items');
    });
});

describe('__item', () => {
    let message: Message;

    beforeEach(() => {
        mocks.reply.mockClear();
        mocks.reply.mockReturnThis();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('returns a random event', async () => {
        const reply = await command.run(message, { _: [] }, new Collection());

        expect(reply).toBe(message);

        const item = mocks.reply.mock.calls[0][0];
        expect(['IDE of Lesser Bugs', 'Phone of Longer Life', 'Pants of Greater Comfort']).toContainEqual(item);
    });

    it('returns an item filtered by rarity', async () => {
        const one = await command.run(message, { _: [], rarity: 'Uncommon' }, new Collection());
        const two = await command.run(message, { _: [], rarity: 'vrare' }, new Collection());

        expect(one).toEqual(message);
        expect(two).toEqual(message);

        expect(mocks.reply.mock.calls[0][0]).toBe('Phone of Longer Life');
        expect(mocks.reply.mock.calls[1][0]).toBe('IDE of Lesser Bugs');
    });

    it('returns an item filtered by type', async () => {
        const one = await command.run(message, { _: [], type: 'Wondrous' }, new Collection());
        const two = await command.run(message, { _: [], type: 'Text Editor' }, new Collection());

        expect(one).toEqual(message);
        expect(two).toEqual(message);

        expect(mocks.reply.mock.calls[0][0]).toBe('Phone of Longer Life');
        expect(mocks.reply.mock.calls[1][0]).toBe('IDE of Lesser Bugs');
    });

    it('returns an item matching multiple filters', async () => {
        const reply = await command.run(message, { _: ['common', 'armor'] }, new Collection());

        expect(reply).toBe(message);

        const item = mocks.reply.mock.calls[0][0];
        expect(item).toBe('Pants of Greater Comfort');
    });

    it('throws an error when no item matches', async () => {
        try {
            await command.run(message, { _: ['very rare', 'weapon'] }, new Collection());

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual("I couldn't find an item matching those parameters.");
        }
    });
});
