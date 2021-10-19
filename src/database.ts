import Keyv from 'keyv';
import { KeyvFile } from 'keyv-file';

import config from './config';
import logger from './logger';

export class Database {
    private impl?: Keyv;

    constructor(private readonly uri: string | undefined, private log: typeof logger) {}

    async get<T>(key: string, fallback?: T): Promise<T> {
        return (await this.kv.get(key)) || fallback;
    }

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        await this.kv.set(key, value, ttl);
    }

    async delete(key: string): Promise<void> {
        await this.kv.delete(key);
    }

    async clear(): Promise<void> {
        await this.kv.clear();
    }

    private get kv() {
        if (this.impl) {
            return this.impl;
        }

        this.impl = this.uri?.startsWith('file:')
            ? new Keyv({
                  store: new KeyvFile({
                      filename: this.uri.slice(5),
                  }),
              })
            : new Keyv(config.dbUrl);

        this.impl.on('error', this.log.error);

        return this.impl;
    }
}

export default new Database(config.dbUrl, logger);
