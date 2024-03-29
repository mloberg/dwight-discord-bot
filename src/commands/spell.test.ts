import { FriendlyError } from '../error';
import spell from './spell';

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

describe('/spell', () => {
    it('is a slash command', () => {
        expect(spell).toMatchSnapshot();
    });

    it('returns a random spell', async () => {
        const command = createMockCommand();

        await spell.handle(command);
        expect(['Debugger', 'Foo', 'Bar']).toContainEqual(command.reply.mock.calls[0][0]);
    });

    it('returns a spell by level', async () => {
        const command = createMockCommand();
        command.options.getInteger.mockReturnValue(0);

        await spell.handle(command);
        expect(command.reply).toHaveBeenCalledWith('Foo');
    });

    it('returns a spell matching multiple parameters', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValueOnce('evocation');
        command.options.getString.mockReturnValueOnce('Wizard');

        await spell.handle(command);
        expect(command.reply).toHaveBeenCalledWith('Debugger');
    });

    it('throws an error if no spell matches', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValueOnce('necromancy');
        command.options.getString.mockReturnValueOnce('Ranger');

        await expect(spell.handle(command)).rejects.toMatchError(
            new FriendlyError("I couldn't find a spell matching those parameters."),
        );
    });
});
