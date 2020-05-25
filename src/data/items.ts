import fetch from "node-fetch";

import { env } from "../utils";
import Cache from "./cache";

interface Item {
    item: string;
    type: string;
    subtype?: string;
    rarity: string;
    attunement: boolean|string;
}

const apiUrl = env("API_URL", "https://dnd.mlo.io/api");
const itemCache = new Cache();

export default async (): Promise<Item[]> => {
    const data = await itemCache.remember("items", async () => {
        return (await fetch(`${apiUrl}/items.json`)).json();
    });
    return data.items;
};
