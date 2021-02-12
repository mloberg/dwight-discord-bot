import { FriendlyError } from '../error';
import { Command, Dictionary } from '../types';

export const conversion: Dictionary<string> = {
    appraise: 'INT',
    balance: 'DEX (Acrobatics)',
    bluff: 'CHA (Persuasion / Deception)',
    climb: 'STR (Athletics)',
    concentration: 'CON',
    craft: 'DEX',
    'decipher script': 'WIS (Insight)',
    diplomacy: 'CHA (Persuasion)',
    'disable device': 'DEX',
    disguise: 'CHA (Deception)',
    'escape artist': 'DEX',
    forgery: 'CHA (Deception)',
    'gather information': 'INT (Investigation)',
    'handle animal': 'WIS (Animal Handling)',
    heal: 'WIS (Medicine)',
    hide: 'DEX (Stealth)',
    intimidate: 'CHA (Intimidation)',
    jump: 'STR Athletics',
    knowledge: 'INT (Arcana / History / Nature / Religion)',
    listen: 'WIS (Perception)',
    'move silently': 'DEX (Stealth)',
    'open lock': 'DEX',
    perform: 'CHA (Performance)',
    profession: 'N/A - see Backgrounds',
    ride: 'WIS (Animal Handling) or DEX (Acrobatics)',
    search: 'INT (Investigation)',
    'sense motive': 'WIS (Insight)',
    'sleight of hand': 'DEX (Sleight of Hand)',
    'speak language': 'INT',
    spellcraft: 'INT (Arcana)',
    spot: 'WIS (Perception) / Passive Perception',
    survival: 'WIS (Survival)',
    swim: 'STR (Athletics)',
    tumble: 'DEX (Acrobatics)',
    'use magic device': 'INT (Arcana)',
    'use rope': 'DEX (Acrobatics)',
};

const command: Command = {
    name: '3.5',
    alias: ['35'],
    args: /(?<skill>.+)/,
    description: '3.5 to 5th edition skills conversion',
    usage: '<skill>',
    async run(message, { groups }) {
        const search = groups.skill?.trim();
        const skill = conversion[search.toLowerCase()];
        if (!skill) {
            throw new FriendlyError(`I couldn't find skill "${search}".`);
        }

        return message.reply(skill);
    },
};

export default command;
