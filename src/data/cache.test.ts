import Cache from './cache';

describe('Cache', () => {
    const cache = new Cache<string>();

    beforeEach(() => {
        cache.clear();
    });

    it('returns the cached value', () => {
        expect(cache.get('test')).toBeUndefined();

        cache.set('foo', 'bar');
        expect(cache.get('foo')).toEqual('bar');
    });

    it('does not return cached value if over ttl', () => {
        cache.set('test', 'expired', -1);
        expect(cache.get('test')).toBeUndefined();
    });

    it('returns remembered value', async () => {
        cache.set('foo', 'cached');
        expect(await cache.remember('foo', () => 'new value')).toBe('cached');
    });

    it('stores remembered value', async () => {
        expect(await cache.remember('foo', () => 'resolved')).toBe('resolved');
        expect(cache.get('foo')).toBe('resolved');
    });
});
