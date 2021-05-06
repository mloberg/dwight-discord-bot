import Keyv from 'keyv';
import { KeyvFile } from 'keyv-file';

import config from './config';
import logger from './logger';

class Database {
    private impl?: Keyv;

    constructor(private readonly uri: string | undefined, private log: typeof logger) {}

    get(key: string, fallback?: unknown) {
        return this.kv.get(key) || fallback;
    }

    set(key: string, value: unknown, ttl?: number) {
        return this.kv.set(key, value, ttl);
    }

    private get kv() {
        if (this.impl) {
            return this.impl;
        }

        this.impl = config.dbUrl?.startsWith('file:')
            ? new Keyv({
                  store: new KeyvFile({
                      filename: this.uri?.substr(5),
                  }),
              })
            : new Keyv(config.dbUrl);

        this.impl.on('error', this.log.error);

        return this.impl;
    }
}

export default new Database(config.dbUrl, logger);
