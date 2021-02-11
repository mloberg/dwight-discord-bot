import axios from 'axios';

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
    return await cache.remember('spells', async () => {
        const response = await axios.get(`${config.apiUrl}/spells.json`);

        return response.data.spells;
    });
};
