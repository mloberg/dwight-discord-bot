import Cache from '../../src/data/cache';

const realDateNow = Date.now.bind(global.Date);
const dateNowStub = jest.fn(() => 1);

beforeEach(() => {
    global.Date.now = dateNowStub;
});

afterEach(() => {
    global.Date.now = realDateNow;
});

describe('Cache', () => {
    it('returns the cached value', () => {
        const cache = new Cache();

        expect(cache.get()).toBeNull();

        cache.set('foobar');
        expect(cache.get()).toEqual('foobar');
    });

    it('does not return cached value if over ttl', () => {
        const cache = new Cache();
        cache.set('foobar');

        dateNowStub.mockReturnValue(3000001);

        expect(cache.get()).toBeNull();
    });

    it('can set ttl on cache set', () => {
        const cache = new Cache(60);
        cache.set('foobar', 3000);

        dateNowStub.mockReturnValue(3000000);
        expect(cache.get()).toEqual('foobar');
    });
});
