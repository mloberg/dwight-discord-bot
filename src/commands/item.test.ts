import { Message } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import { FriendlyError } from '../error';
import command from './item';

jest.mock('discord.js');
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
    it('returns a random item', async () => {
        const message = mocked(new Message({} as never, {} as never));

        await command.run(message, { command: 'item', args: [], match: [], groups: {} });

        const item = message.reply.mock.calls[0][0];
        expect(['IDE of Lesser Bugs', 'Phone of Longer Life', 'Pants of Greater Comfort']).toContainEqual(item);
    });

    it('returns an item filtered by rarity', async () => {
        const message = new Message({} as never, {} as never);

        await command.run(message, { command: 'item', args: [], match: [], groups: { rarity: 'Uncommon' } });
        expect(message.reply).toHaveBeenLastCalledWith('Phone of Longer Life');

        await command.run(message, { command: 'item', args: [], match: [], groups: { rarity: 'very rare' } });
        expect(message.reply).toHaveBeenLastCalledWith('IDE of Lesser Bugs');
    });

    it('returns an item filtered by type', async () => {
        const message = new Message({} as never, {} as never);

        await command.run(message, { command: 'item', args: [], match: [], groups: { type: 'Wondrous' } });
        expect(message.reply).toHaveBeenLastCalledWith('Phone of Longer Life');

        await command.run(message, { command: 'item', args: [], match: [], groups: { type: 'Text Editor' } });
        expect(message.reply).toHaveBeenLastCalledWith('IDE of Lesser Bugs');
    });

    it('returns an item matching multiple filters', async () => {
        const message = new Message({} as never, {} as never);

        await command.run(message, {
            command: 'item',
            args: [],
            match: [],
            groups: { rarity: 'common', type: 'armor' },
        });
        expect(message.reply).toHaveBeenLastCalledWith('Pants of Greater Comfort');
    });

    it('throws an error when no item matches', async () => {
        const message = new Message({} as never, {} as never);

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
