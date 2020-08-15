export default class Cache<T> {
    private value: T;
    private expires: number;
    constructor(readonly ttl = 300) {}

    get(): null | T {
        if (this.value && this.expires && this.expires > Date.now()) {
            return this.value;
        }
        return null;
    }

    set(value: T, ttl?: number): void {
        this.expires = Date.now() + (ttl ?? this.ttl * 1000);
        this.value = value;
    }
}
