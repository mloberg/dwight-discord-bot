import fetch from 'node-fetch';

import { env } from '../utils';
import Cache from './cache';

interface Item {
    item: string;
    type: string;
    subtype?: string;
    rarity: string;
    attunement: boolean | string;
}

const apiUrl = env('API_URL', 'https://dnd.mlo.io/api');
const cache = new Cache<Item[]>();

export default async (): Promise<Item[]> => {
    const cached = cache.get();
    if (cached) {
        return cached;
    }

    const response = await fetch(`${apiUrl}/items.json`);
    const data = await response.json();
    cache.set(data.items);

    return data.items;
};
