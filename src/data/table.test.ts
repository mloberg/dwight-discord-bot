import tables from './table';

jest.mock('lodash', () => ({
    sample: jest.fn((x) => x[0]),
}));
jest.mock('./spells', () => {
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

const resolveTable = async (table: (string | (() => Promise<string>))[]) => {
    const resolved = [];
    for (const item of table) {
        resolved.push(typeof item === 'string' ? item : await item());
    }
    return resolved;
};

describe('treasure table data', () => {
    test('table a', async () => {
        expect(await resolveTable(tables.a)).toMatchSnapshot();
    });

    test('table b', async () => {
        expect(await resolveTable(tables.b)).toMatchSnapshot();
    });

    test('table c', async () => {
        expect(await resolveTable(tables.c)).toMatchSnapshot();
    });

    test('table d', async () => {
        expect(await resolveTable(tables.d)).toMatchSnapshot();
    });

    test('table e', async () => {
        expect(await resolveTable(tables.e)).toMatchSnapshot();
    });

    test('table f', async () => {
        expect(await resolveTable(tables.f)).toMatchSnapshot();
    });

    test('table g', async () => {
        expect(await resolveTable(tables.g)).toMatchSnapshot();
    });

    test('table h', async () => {
        expect(await resolveTable(tables.h)).toMatchSnapshot();
    });

    test('table i', async () => {
        expect(await resolveTable(tables.i)).toMatchSnapshot();
    });
});
