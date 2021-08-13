import { FriendlyError } from '../error';
import { SlashCommand } from '../types';

const skills: Record<string, string> = {
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

const skill: SlashCommand = {
    name: '35',
    description: 'Convert 3.5 skill to 5e',
    options: [
        {
            name: 'skill',
            description: '3.5 skill',
            type: 'STRING',
            required: true,
        },
    ],
    async run(command) {
        const search = command.options.getString('skill', true);
        const skill = skills[search.toLowerCase()];
        if (!skill) {
            throw new FriendlyError(`I couldn't find skill "${search}".`);
        }

        await command.reply(skill);
    },
};

export default skill;
