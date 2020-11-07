import fetch from 'node-fetch';

import config from '../config';
import Cache from './cache';

interface Item {
    item: string;
    type: string;
    subtype?: string;
    rarity: string;
    attunement: boolean | string;
}

const cache = new Cache<Item[]>(86400);

export default async (): Promise<Item[]> => {
    const cached = cache.get();
    if (cached) {
        return cached;
    }

    const response = await fetch(`${config.apiUrl}/items.json`);
    const data = await response.json();
    cache.set(data.items);

    return data.items;
};
