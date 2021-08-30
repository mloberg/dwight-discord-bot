import { roll } from './utils';

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
            expect((err as Error).message).toEqual('Invalid roll expression');
        }
    });
});
