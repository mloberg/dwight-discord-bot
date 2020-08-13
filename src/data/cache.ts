interface CacheItem<T> {
    value: T;
    expires: Date;
}

export default class Cache<T> {
    private cache: Record<string, CacheItem<T>> = {};
    constructor(readonly ttl = 300) {}

    get(key: string): null | T {
        const cache = this.cache[key];
        if (cache && cache.expires.getTime() > new Date().getTime()) {
            return cache.value;
        }
        return null;
    }

    set(key: string, value: T, ttl?: number): void {
        const expires = new Date();
        expires.setSeconds(expires.getSeconds() + (ttl || this.ttl));
        this.cache[key] = { value, expires };
    }

    remember(key: string, value: { (): T }, ttl?: number): T {
        const cached = this.get(key);
        if (cached) {
            return cached;
        }

        const resolved = value();
        this.set(key, resolved, ttl);
        return resolved;
    }
}
