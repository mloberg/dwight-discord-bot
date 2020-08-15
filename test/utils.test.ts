import { between, env, random, resolve, roll, ucfirst } from '../src/utils';

describe('between', () => {
    it('returns a number between two given numbers', () => {
        expect(between(4, 6)).toBeGreaterThanOrEqual(4);
        expect(between(4, 6)).toBeLessThanOrEqual(6);
    });
});

describe('env', () => {
    it('returns the value of an environment variable', () => {
        expect(env('NODE_ENV', '')).toEqual('test');
    });

    it('returns a default if no environment variable is set', () => {
        expect(env('FOOBARBAZ', 'hello world')).toEqual('hello world');
    });
});

describe('random', () => {
    it('should return a random item from an array', () => {
        expect(['foo', 'bar']).toContain(random(['foo', 'bar']));
        expect(random(['baz'])).toEqual('baz');
    });
});

describe('resolve', () => {
    it('returns the value if a string', async () => {
        expect(await resolve('foobar')).toEqual('foobar');
    });

    it('resolves the promise, returning the value', async () => {
        expect(
            await resolve(async () => {
                return ['hello', 'world'].join('-');
            }),
        ).toEqual('hello-world');
    });
});

describe('roll', () => {
    it.each([
        ['d4', 1, 4],
        ['2d8+4', 6, 20],
        ['d100-90', 1, 10],
        ['2d4x2', 2, 16],
    ])('resolves the dice roll %s', (expr, min, max) => {
        expect(roll(expr)).toBeGreaterThanOrEqual(min);
        expect(roll(expr)).toBeLessThanOrEqual(max);
    });

    it('throws an error on an invalid dice expression', () => {
        try {
            roll('foo');
            fail('expected error to be thrown');
        } catch (err) {
            expect(err.message).toEqual('Invalid roll expression');
        }
    });
});

describe('ucfirst', () => {
    it('capitalizes the first letter', () => {
        expect(ucfirst('foobar')).toEqual('Foobar');
        expect(ucfirst('foo bar')).toEqual('Foo bar');
    });
});
