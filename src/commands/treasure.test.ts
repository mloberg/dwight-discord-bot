import treasure from './treasure';

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

describe('/treasure', () => {
    it('is a slash command', () => {
        expect(treasure).toMatchSnapshot();
    });

    it('returns random individual treasure', async () => {
        const command = createMockCommand();
        command.options.getInteger.mockReturnValueOnce(1);

        await treasure.handle(command);
        expect(command.reply).toHaveBeenCalledWith(expect.stringMatching(/\* \d+ [cegps]p$/));
    });

    it('returns random individual treasure for a dice roll', async () => {
        const command = createMockCommand();
        command.options.getInteger.mockReturnValueOnce(17);
        command.options.getInteger.mockReturnValue(99);

        await treasure.handle(command);
        expect(command.reply).toHaveBeenCalledWith(expect.stringMatching(/\* \d+ [gp]p$/));
    });

    it('returns random treasure hoard', async () => {
        const command = createMockCommand();
        command.options.getInteger.mockReturnValueOnce(1);
        command.options.getInteger.mockReturnValueOnce(99);
        command.options.getBoolean.mockReturnValue(true);

        await treasure.handle(command);
        expect(command.reply).toHaveBeenCalledWith(expect.stringMatching(/(Gem|Art|Item): .+$/));
    });
});
