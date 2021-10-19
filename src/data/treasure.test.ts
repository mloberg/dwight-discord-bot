import { art, crIndex, gems, hoard, individual } from './treasure';

test('crIndex returns the correct index for the given cr', () => {
    expect(crIndex(0)).toBe('0-4');
    expect(crIndex(1)).toBe('0-4');
    expect(crIndex(2)).toBe('0-4');
    expect(crIndex(3)).toBe('0-4');
    expect(crIndex(4)).toBe('0-4');
    expect(crIndex(5)).toBe('5-10');
    expect(crIndex(6)).toBe('5-10');
    expect(crIndex(7)).toBe('5-10');
    expect(crIndex(8)).toBe('5-10');
    expect(crIndex(9)).toBe('5-10');
    expect(crIndex(10)).toBe('5-10');
    expect(crIndex(11)).toBe('11-16');
    expect(crIndex(12)).toBe('11-16');
    expect(crIndex(13)).toBe('11-16');
    expect(crIndex(14)).toBe('11-16');
    expect(crIndex(15)).toBe('11-16');
    expect(crIndex(16)).toBe('11-16');
    expect(crIndex(17)).toBe('17+');
    expect(crIndex(18)).toBe('17+');
    expect(crIndex(19)).toBe('17+');
});

test('art', () => {
    expect(art).toMatchSnapshot();
});

test('gems', () => {
    expect(gems).toMatchSnapshot();
});

test('treasure', () => {
    expect(individual).toMatchSnapshot();
    expect(hoard).toMatchSnapshot();
});
