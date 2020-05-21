import fetch from "node-fetch";

import Cache from "./cache";

interface Spell {
    spell: string;
    level: number;
    school: string;
    class: string[];
}

const spellCache = new Cache();

export default async (): Promise<Spell[]> => {
    const data = await spellCache.remember("spells", async () => {
        return (await fetch("https://dnd.mlo.io/api/spells.json")).json();
    });
    return data.spells;
};
