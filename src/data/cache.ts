interface CacheItem<T> {
    value: T;
    expires: number;
}

export default class Cache<T> {
    private pool: Record<string, CacheItem<T>> = {};
    constructor(readonly ttl = 300) {}

    clear(): void {
        this.pool = {};
    }

    get(key: string, fallback?: T): T | undefined {
        const item = this.pool[key];
        if (item && item.expires > Date.now()) {
            return item.value;
        }
        delete this.pool[key];

        return fallback;
    }

    set(key: string, value: T, ttl?: number): void {
        this.pool[key] = {
            value,
            expires: Date.now() + (ttl ?? this.ttl * 1000),
        };
    }

    async remember(key: string, resolver: () => T | Promise<T>, ttl?: number): Promise<T> {
        const cached = this.get(key);
        if (cached) {
            return cached;
        }

        const value = await resolver();
        this.set(key, value, ttl);

        return value;
    }
}
