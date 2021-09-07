import fs from 'fs';
import os from 'os';
import path from 'path';
import { promisify } from 'util';

import { Database } from './database';
import logger from './logger';

const wait = promisify(setTimeout);
const until = async (predicate: () => boolean, retries = 10, timeout = 50): Promise<boolean> => {
    const result = predicate();
    if (!result && retries) {
        await wait(timeout);
        return await until(predicate, retries - 1, timeout);
    }

    return result;
};

describe('Database', () => {
    const database = new Database(undefined, logger);
    const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'dwight-'));

    beforeEach(async () => {
        await database.clear();
    });

    afterAll(() => {
        fs.rmSync(temporary, { recursive: true });
    });

    it('saves, gets, and deletes values', async () => {
        await database.set('foo', 'bar');
        await expect(database.get('foo')).resolves.toBe('bar');

        await database.delete('foo');
        await expect(database.get('foo')).resolves.toBeUndefined();
    });

    it('returns the fallback value if none is set', async () => {
        await expect(database.get('bar')).resolves.toBeUndefined();
        await expect(database.get('bar', 'baz')).resolves.toBe('baz');
    });

    it('can store to a file', async () => {
        const filepath = path.join(temporary, 'database.txt');
        const file = new Database(`file:${filepath}`, logger);

        await file.set('test', 'test');

        await expect(until(() => fs.existsSync(filepath))).resolves.toBe(true);
    });
});
