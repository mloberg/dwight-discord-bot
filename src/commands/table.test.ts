import table from './table';

jest.mock('../data/table', () => ({
    a: new Array(100).fill('foo'),
    b: [...new Array(98).fill('bar'), 'test', 'foobar'],
    c: new Array(100).fill(() => 'baz'),
}));

describe('/table', () => {
    it('is a slash command', () => {
        expect(table).toMatchSnapshot();
    });

    it('returns a random item from a table', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValue('a');

        await table.handle(command);
        expect(command.reply).toHaveBeenCalledWith('foo');
    });

    it('returns an item from a table for a dice roll', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValue('b');
        command.options.getInteger.mockReturnValue(99);

        await table.handle(command);
        expect(command.reply).toHaveBeenCalledWith('test');
    });

    it('returns a resolved value', async () => {
        const command = createMockCommand();
        command.options.getString.mockReturnValue('c');

        await table.handle(command);
        expect(command.reply).toHaveBeenCalledWith('baz');
    });
});
