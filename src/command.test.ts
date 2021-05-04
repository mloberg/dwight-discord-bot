import Command, { Manager } from './command';

const full = new Command({
    name: 'full',
    alias: ['max'],
    description: 'Command with all properties set',
    usage: '<test>',
    examples: ['full test'],
    args: /foo/,
    run: jest.fn(),
});
const min = new Command({
    name: 'min',
    description: 'Command with just the minimum set',
    run: jest.fn(),
});

describe('Command', () => {
    it('sets defaults', () => {
        expect(full.name).toBe('full');
        expect(full.alias).toEqual(['max']);
        expect(full.description).toBe('Command with all properties set');
        expect(full.usage).toBe('<test>');
        expect(full.examples).toEqual(['full test']);
        expect(full.args).toEqual(/foo/);

        expect(min.name).toBe('min');
        expect(min.alias).toEqual([]);
        expect(min.description).toBe('Command with just the minimum set');
        expect(min.usage).toBe('');
        expect(min.examples).toEqual([]);
        expect(min.args).toEqual(/.*/);
    });

    it('displays help', () => {
        expect(full.help('_')).toBe(`**full**: Command with all properties set
*aliases*: max
*usage*: \`_full <test>\`
*examples*: \`_full full test\``);

        expect(min.help('_')).toBe('**min**: Command with just the minimum set');
    });
});

describe('Manager', () => {
    it('registers commands', () => {
        const manager = new Manager();
        manager.register(full);

        expect(manager.list()).toEqual(['full']);

        manager.register(min);

        expect(manager.get('full')).toBe(full);
        expect(manager.get('max')).toBe(full);

        expect(manager.list()).toEqual(['full', 'min']);
        expect(manager.all()).toEqual(['full', 'max', 'min']);
    });
});
