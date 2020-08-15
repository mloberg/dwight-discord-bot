import treasure, { art, crIndex, gems } from '../../src/data/treasure';

test('crIndex returns the correct index for the given cr', () => {
    expect(crIndex(0)).toEqual('0-4');
    expect(crIndex(1)).toEqual('0-4');
    expect(crIndex(2)).toEqual('0-4');
    expect(crIndex(3)).toEqual('0-4');
    expect(crIndex(4)).toEqual('0-4');
    expect(crIndex(5)).toEqual('5-10');
    expect(crIndex(6)).toEqual('5-10');
    expect(crIndex(7)).toEqual('5-10');
    expect(crIndex(8)).toEqual('5-10');
    expect(crIndex(9)).toEqual('5-10');
    expect(crIndex(10)).toEqual('5-10');
    expect(crIndex(11)).toEqual('11-16');
    expect(crIndex(12)).toEqual('11-16');
    expect(crIndex(13)).toEqual('11-16');
    expect(crIndex(14)).toEqual('11-16');
    expect(crIndex(15)).toEqual('11-16');
    expect(crIndex(16)).toEqual('11-16');
    expect(crIndex(17)).toEqual('17+');
    expect(crIndex(18)).toEqual('17+');
    expect(crIndex(19)).toEqual('17+');
});

test('art', () => {
    expect(art).toMatchSnapshot();
});

test('gems', () => {
    expect(gems).toMatchSnapshot();
});

test('treasure', () => {
    expect(treasure).toMatchSnapshot();
});
