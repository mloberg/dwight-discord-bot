import { Command, CommandMessage } from "discord.js-commando";

import { between } from "../../utils";

const prices = {
    common: [50, 100],
    uncommon: [100, 500],
    rare: [500, 5000],
    "very rare": [5000, 10000],
};
const mods = {
    location: {
        hamlet: 1.5,
        village: 1.36,
        town: 1.24,
        city: 1.12,
        capital: 1.0,
        duchy: 0.95,
        kingdom: 0.9,
        skip: 1,
    },
    prosperity: {
        booming: 0.9,
        prosperous: 1,
        modest: 1.1,
        poor: 1.2,
        "very poor": 1.35,
        squalid: 1.5,
        skip: 1,
    },
    competition: {
        none: 1.5,
        some: 1.2,
        moderate: 1.0,
        lots: 0.9,
        skip: 1,
    },
    affinity: {
        admired: 0.9,
        appreciated: 1.0,
        liked: 1.1,
        indifferent: 1.2,
        hate: 1.3,
        despise: 1.4,
        abhor: 1.5,
        skip: 1,
    },
};

const optString = (obj) => Object.keys(obj).join(", ");

export default class Price extends Command {
    constructor(client) {
        super(client, {
            name: "price",
            aliases: ["cost"],
            group: "dnd",
            memberName: "price",
            description: "Determine the price of an item based on different factors.",
            examples: ["price rare", "price rare city prosperous none good"],
            format: "<rarity or base cost> [location] [prosperity] [competition] [affinity]",
            args: [
                {
                    key: "rarity",
                    prompt: `What's the rarity of the item or base cost? (${optString(prices)})`,
                    type: "string",
                    validate: r => !isNaN(Number(r)) || Object.keys(prices).includes(r.toLowerCase()),
                    parse: r => {
                        const base = Number(r);
                        if (!isNaN(base)) {
                            return base;
                        }
                        const [min, max] = prices[r];
                        return between(min, max);
                    },
                },
                {
                    key: "location",
                    prompt: `Where is this shop located? (${optString(mods.location)})`,
                    type: "string",
                    validate: l => Object.keys(mods.location).includes(l.toLowerCase()),
                    parse: l => mods.location[l.toLowerCase()],
                },
                {
                    key: "prosperity",
                    prompt: `How prosperous is the location? (${optString(mods.prosperity)})`,
                    type: "string",
                    validate: p => Object.keys(mods.prosperity).includes(p.toLowerCase()),
                    parse: p => mods.prosperity[p.toLowerCase()],
                },
                {
                    key: "competition",
                    prompt: `How much competition does the shop have? (${optString(mods.competition)})`,
                    type: "string",
                    validate: c => Object.keys(mods.competition).includes(c.toLowerCase()),
                    parse: c => mods.competition[c.toLowerCase()],
                },
                {
                    key: "affinity",
                    prompt: `What is the attitude of the shop owner towards the party? (${optString(mods.affinity)})`,
                    type: "string",
                    validate: a => Object.keys(mods.affinity).includes(a.toLowerCase()),
                    parse: a => mods.affinity[a.toLowerCase()],
                },
                {
                    key: "insight",
                    prompt: "What did the shopkeep role on insight?",
                    type: "crit",
                    min: 0,
                },
                {
                    key: "persuasion",
                    prompt: "What did the player roll on persuasion?",
                    type: "crit",
                    min: 0,
                },
            ],
        });
    }

    async run(msg: CommandMessage, args) {
        const modifiers = [
            args.location,
            args.prosperity,
            args.competition,
            args.affinity,
        ];
        const sum = modifiers.reduce((a, b) => a + b, 0);
        const avg = (sum / modifiers.length) || 1;
        const round = Math.round(avg * 100) / 100;
        const price = Math.ceil(args.rarity * round);

        let discount = (args.persuasion[1] - args.insight[1]) * 2;
        if (args.persuasion[0] || args.insight[0]) {
            discount = discount * 2;
        }

        const adjustment = (discount / 100) * price;
        const final = Math.ceil(price - adjustment);

        await msg.reply(`Price is ${final}`);

        return await msg.author.send([
            "Price calculation stats:",
            `* Base price: ${args.rarity}`,
            `* Local economy modifier: ${round}`,
            `* Local price: ${price}`,
            `* Party discount: ${discount}%`,
        ].join("\n"));
    }
}
