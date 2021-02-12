import { Client, Guild, Message, TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import command from './item';

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
jest.mock('../data/items', () => {
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

describe('_item configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('item');
        expect(command.description).toEqual('Return a random magic item');
        expect(command.usage).toEqual('[rarity] [type]');
    });

    it('should have an alias', () => {
        expect(command.alias).toContain('items');
    });
});

describe('_item', () => {
    let message: Message;

    beforeEach(() => {
        mocks.reply.mockClear();
        mocks.reply.mockReturnThis();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('returns a random item', async () => {
        await command.run(message, { command: 'item', args: [], match: [], groups: {} });

        const item = mocks.reply.mock.calls[0][0];
        expect(['IDE of Lesser Bugs', 'Phone of Longer Life', 'Pants of Greater Comfort']).toContainEqual(item);
    });

    it('returns an item filtered by rarity', async () => {
        await command.run(message, { command: 'item', args: [], match: [], groups: { rarity: 'Uncommon' } });
        expect(mocks.reply).toHaveBeenLastCalledWith('Phone of Longer Life');

        await command.run(message, { command: 'item', args: [], match: [], groups: { rarity: 'very rare' } });
        expect(mocks.reply).toHaveBeenLastCalledWith('IDE of Lesser Bugs');
    });

    it('returns an item filtered by type', async () => {
        await command.run(message, { command: 'item', args: [], match: [], groups: { type: 'Wondrous' } });
        expect(mocks.reply).toHaveBeenLastCalledWith('Phone of Longer Life');

        await command.run(message, { command: 'item', args: [], match: [], groups: { type: 'Text Editor' } });
        expect(mocks.reply).toHaveBeenLastCalledWith('IDE of Lesser Bugs');
    });

    it('returns an item matching multiple filters', async () => {
        await command.run(message, {
            command: 'item',
            args: [],
            match: [],
            groups: { rarity: 'common', type: 'armor' },
        });
        expect(mocks.reply).toHaveBeenLastCalledWith('Pants of Greater Comfort');
    });

    it('throws an error when no item matches', async () => {
        try {
            await command.run(message, {
                command: 'item',
                args: [],
                match: [],
                groups: { rarity: 'very rare', type: 'weapon' },
            });
            fail('expected error to be thrown');
        } catch (err) {
            expect(err).toBeInstanceOf(FriendlyError);
            expect(err.message).toEqual("I couldn't find an item matching those parameters.");
        }
    });
});
