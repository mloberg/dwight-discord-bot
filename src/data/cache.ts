export default class Cache<T> {
    private value: T;
    private expires: Date;
    constructor(readonly ttl = 300) {}

    get(): null | T {
        if (this.value && this.expires.getTime() > new Date().getTime()) {
            return this.value;
        }
        return null;
    }

    set(value: T, ttl?: number): void {
        const expires = new Date();
        expires.setSeconds(expires.getSeconds() + (ttl || this.ttl));
        this.value = value;
        this.expires = expires;
    }
}
