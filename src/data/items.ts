import axios from 'axios';

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
    return await cache.remember('items', async () => {
        const response = await axios.get<{ items: Item[] }>(`${config.apiUrl}/items.json`);

        return response.data.items;
    });
};
