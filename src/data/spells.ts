import fetch from 'node-fetch';

import config from '../config';
import Cache from './cache';

interface Spell {
    spell: string;
    level: number;
    school: string;
    class: string[];
}

const cache = new Cache<Spell[]>(86400);

export default async (): Promise<Spell[]> => {
    const cached = cache.get();
    if (cached) {
        return cached;
    }

    const response = await fetch(`${config.apiUrl}/spells.json`);
    const data = await response.json();
    cache.set(data.spells);

    return data.spells;
};
