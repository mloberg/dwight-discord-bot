import { Message } from 'discord.js';

import { Arguments, Command } from '../types';
import { roll } from '../utils';

export const wildMagic = [
    'Roll on this table at the start of each of your turns for the next minute, ignoring this result on subsequent rolls.',
    'For the next minute, you can see any invisible creature if you have line of sight to it.',
    'A modron chosen and controlled by the DM appears in an unoccupied space within 5 feet of you, then disappears 1 minute later.',
    'You cast fireball as a 3rd-level spell centered on yourself.',
    'You cast magic missile as a 5th-level spell.',
    'Roll a d10. Your height changes by a number of inches equal to the roll. If the roll is odd, you shrink. If the roll is even, you grow.',
    'You cast confusion centered on yourself.',
    'For the next minute, you regain 5 hit points at the start of each of your turns.',
    'You grow a long beard made of feathers that remains until you sneeze, at which point the feathers explode out from your face.',
    'You cast grease centered on yourself.',
    'Creatures have disadvantage on saving throws against the next spell you cast in the next minute that involves a saving throw.',
    'Your skin turns a vibrant shade of blue. A remove curse spell can end this effect.',
    'An eye appears on your forehead for the next minute. During that time, you have advantage on Wisdom (Perception) checks that rely on sight.',
    'For the next minute, all your spells with a casting time of 1 action have a casting time of 1 bonus action.',
    'You teleport up to 60 feet to an unoccupied space of your choice that you can see.',
    'You are transported to the Astral Plane until the end of your next turn, after which time you return to the space you previously occupied or the nearest unoccupied space if that space is occupied.',
    'Maximize the damage of the next damaging spell you cast within the next minute.',
    'Roll a d10. Your age changes by a number of years equal to the roll. If the roll is odd, you get younger (minimum 1 year old). If the roll is even, you get older.',
    '1d6 flumphs controlled by the DM appear in unoccupied spaces within 60 feet of you and are frightened of you. They vanish after 1 minute.',
    'You regain 2d10 hit points.',
    'You turn into a potted plant until the start of your next turn. While a plant, you are incapacitated and have vulnerability to all damage. If you drop to 0 hit points, your pot breaks, and your form reverts.',
    'For the next minute, you can teleport up to 20 feet as a bonus action on each of your turns.',
    'You cast levitate on yourself.',
    'A unicorn controlled by the DM appears in a space within 5 feet of you, then disappears 1 minute later.',
    'You can’t speak for the next minute. Whenever you try, pink bubbles float out of your mouth.',
    'A spectral shield hovers near you for the next minute, granting you a +2 bonus to AC and immunity to magic missile.',
    'You are immune to being intoxicated by alcohol for the next 5d6 days.',
    'Your hair falls out but grows back within 24 hours.',
    'For the next minute, any flammable object you touch that isn’t being worn or carried by another creature bursts into flame.',
    'You regain your lowest-level expended spell slot.',
    'For the next minute, you must shout when you speak.',
    'You cast fog cloud centered on yourself.',
    'Up to three creatures you choose within 30 feet of you take 4d10 lightning damage.',
    'You are frightened by the nearest creature until the end of your next turn.',
    'Each creature within 30 feet of you becomes invisible for the next minute. The invisibility ends on a creature when it attacks or casts a spell.',
    'You gain resistance to all damage for the next minute.',
    'A random creature within 60 feet of you becomes poisoned for 1d4 hours.',
    'You glow with bright light in a 30-foot radius for the next minute. Any creature that ends its turn within 5 feet of you is blinded until the end of its next turn.',
    'You cast polymorph on yourself. If you fail the saving throw, you turn into a sheep for the spell’s duration.',
    'Illusory butterflies and flower petals flutter in the air within 10 feet of you for the next minute.',
    'You can take one additional action immediately.',
    'Each creature within 30 feet of you takes 1d10 necrotic damage. You regain hit points equal to the sum of the necrotic damage dealt.',
    'You cast mirror image.',
    'You cast fly on a random creature within 60 feet of you.',
    'You become invisible for the next minute. During that time, other creatures can’t hear you. The invisibility ends if you attack or cast a spell.',
    'If you die within the next minute, you immediately come back to life as if by the reincarnate spell.',
    'Your size increases by one size category for the next minute.',
    'You and all creatures within 30 feet of you gain vulnerability to piercing damage for the next minute.',
    'You are surrounded by faint, ethereal music for the next minute.',
    'You regain all expended sorcery points.',
];

const command: Command = {
    name: 'wild',
    description: 'Roll on the Wild Magic table',
    alias: ['wild-magic'],
    usage: '[ROLL]',
    async run(message: Message, args: Arguments): Promise<Message> {
        const dice = args.roll || args._[0] || roll('d100');
        const index = Math.floor((dice - 1) / 2);
        const result = wildMagic[index];

        await message.delete();

        return message.reply(result);
    },
};

export default command;
