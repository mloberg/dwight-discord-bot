import fetch from 'node-fetch';

import { env } from '../utils';
import Cache from './cache';

interface Spell {
    spell: string;
    level: number;
    school: string;
    class: string[];
}

const apiUrl = env('API_URL', 'https://dnd.mlo.io/api');
const spellCache = new Cache();

export default async (): Promise<Spell[]> => {
    const data = await spellCache.remember('spells', async () => {
        return (await fetch(`${apiUrl}/spells.json`)).json();
    });
    return data.spells;
};
