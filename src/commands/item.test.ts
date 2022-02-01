import { FriendlyError } from '../error';
import item from './item';

jest.mock('../data/items', () => {
    return () => [
        {
            item: 'IDE of Lesser Bugs',
            type: 'Tool',
            subtype: 'Text Editor',
            rarity: 'very rare',
            attunement: 'developer',
        },
        {
            item: 'Phone of Longer Life',
            type: 'Wondrous Item',
            rarity: 'uncommon',
            attunement: false,
        },
        {
            item: 'Pants of Greater Comfort',
            type: 'Armor',
            rarity: 'common',
            attunement: true,
        },
    ];
});

describe('/item', () => {
    it('is a slash command', () => {
        expect(item).toMatchSnapshot();
    });

    it('returns a random item', async () => {
        const command = createMockCommand();

        await item.handle(command);
        expect(['IDE of Lesser Bugs', 'Phone of Longer Life', 'Pants of Greater Comfort']).toContainEqual(
            command.reply.mock.calls[0][0],
        );
    });

    it('returns an item filtered by rarity', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValueOnce('uncommon');

        await item.handle(command);
        expect(command.reply).toHaveBeenCalledWith('Phone of Longer Life');
    });

    it('returns an item filtered by type', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValueOnce(null); // eslint-disable-line unicorn/no-null
        command.options.getString.mockReturnValueOnce('Wondrous');

        await item.handle(command);
        expect(command.reply).toHaveBeenCalledWith('Phone of Longer Life');
    });

    it('returns an item filtered by subtype', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValueOnce(null); // eslint-disable-line unicorn/no-null
        command.options.getString.mockReturnValueOnce('Text Editor');

        await item.handle(command);
        expect(command.reply).toHaveBeenCalledWith('IDE of Lesser Bugs');
    });

    it('returns an item matching multiple filters', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValueOnce('common');
        command.options.getString.mockReturnValueOnce('armor');

        await item.handle(command);
        expect(command.reply).toHaveBeenCalledWith('Pants of Greater Comfort');
    });

    it('throws an error if no item matches', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValueOnce('very rare');
        command.options.getString.mockReturnValueOnce('weapon');

        await expect(item.handle(command)).rejects.toMatchError(
            new FriendlyError("I couldn't find an item matching those parameters."),
        );
    });
});
