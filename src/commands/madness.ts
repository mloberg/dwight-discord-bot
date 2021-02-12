import { sample } from 'lodash';

import { FriendlyError } from '../error';
import { Command, Dictionary } from '../types';
import { roll } from '../utils';

interface Madness {
    duration: string;
    time: string;
    options: string[];
}

export const madness: Dictionary<Madness> = {
    short: {
        duration: '1d10',
        time: 'minutes',
        options: [
            ...new Array(20).fill(
                'You retreat into your mind and becomes paralyzed. The effect ends if the character takes any damage.',
            ), // 1–20
            ...new Array(10).fill('You become incapacitated and spend the duration screaming, laughing, or weeping.'), // 21–30
            ...new Array(10).fill(
                'You become frightened and must use your action and movement each round to flee from the source of the fear.',
            ), // 31–40
            ...new Array(10).fill('You begin babbling and are incapable of normal speech or spellcasting.'), // 41–50
            ...new Array(10).fill('You must use your action each round to attack the nearest creature.'), // 51–60
            ...new Array(10).fill('You experience vivid hallucinations and have disadvantage on ability checks.'), // 61–70
            ...new Array(5).fill('You do whatever anyone tells you to do that isn’t obviously self-destructive.'), // 71–75
            ...new Array(5).fill(
                'You experience an overpowering urge to eat something strange such as dirt, slime, or offal.',
            ), // 76–80
            ...new Array(10).fill('You are stunned.'), // 81–90
            ...new Array(10).fill('You fall unconscious.'), // 91–100
        ],
    },
    long: {
        duration: '1d10×10',
        time: 'hours',
        options: [
            ...new Array(10).fill(
                'You feel compelled to repeat a specific activity over and over, such as washing hands, touching things, praying, or counting coins.',
            ), // 1–10
            ...new Array(10).fill('You experience vivid hallucinations and have disadvantage on ability checks.'), // 11–20
            ...new Array(10).fill('You suffer extreme paranoia. You have disadvantage on Wisdom and Charisma checks.'), // 31–40
            ...new Array(5).fill(
                'You experience a powerful delusion. Choose a potion. You imagine that you are under its effects.',
            ), // 41–45
            ...new Array(10).fill(
                'You become attached to a “lucky charm,” such as a person or an object, and have disadvantage on attack rolls, ability checks, and saving throws while more than 30 feet from it.',
            ), // 46–55
            ...new Array(10).fill('You are blinded (25%) or deafened (75%).'), // 56–65
            ...new Array(10).fill(
                'You experience uncontrollable tremors or tics, which impose disadvantage on attack rolls, ability checks, and saving throws that involve Strength or Dexterity.',
            ), // 66–75
            ...new Array(10).fill(
                "You suffer from partial amnesia. You know who you are and retains racial traits and class features, but you don't recognize other people or remember anything that happened before the madness took effect.",
            ), // 76–85
            ...new Array(5).fill(
                'Whenever you take damage, you must succeed on a DC 15 Wisdom saving throw or be affected as though you failed a saving throw against the confusion spell. The confusion effect lasts for 1 minute.',
            ), // 86–90
            ...new Array(5).fill('You lose the ability to speak.'), // 91–95
            ...new Array(5).fill('You fall unconscious. No amount of jostling or damage can wake you.'), // 96–100
        ],
    },
    flaw: {
        duration: '',
        time: 'until cured',
        options: [
            ...new Array(15).fill('You gain the following flaw: "Being drunk keeps me sane."'), // 1–15
            ...new Array(10).fill('You gain the following flaw: "I keep whatever I find."'), // 16–25
            ...new Array(5).fill(
                'You gain the following flaw: "I try to become more like someone else I know — adopting his or her style of dress, mannerisms, and name."',
            ), // 26–30
            ...new Array(5).fill(
                'You gain the following flaw: "I must bend the truth, exaggerate, or outright lie to be interesting to other people."',
            ), // 31–35
            ...new Array(10).fill(
                'You gain the following flaw: "Achieving my goal is the only thing of interest to me, and I’ll ignore everything else to pursue it."',
            ), // 36–45
            ...new Array(5).fill(
                'You gain the following flaw: "I find it hard to care about anything that goes on around me."',
            ), // 46–50
            ...new Array(5).fill('You gain the following flaw: "I don’t like the way people judge me all the time."'), // 51–55
            ...new Array(15).fill(
                'You gain the following flaw: "I am the smartest, wisest, strongest, fastest, and most beautiful person I know."',
            ), // 56–70
            ...new Array(10).fill(
                'You gain the following flaw: "I am convinced that powerful enemies are hunting me, and their agents are everywhere I go. I am sure they’re watching me all the time."',
            ), // 71–80
            ...new Array(5).fill(
                'You gain the following flaw: "There’s only one person I can trust. And only I can see this special friend."',
            ), // 81–85
            ...new Array(10).fill(
                'You gain the following flaw: "I can’t take anything seriously. The more serious the situation, the funnier I find it."',
            ), // 86–95
            ...new Array(5).fill('You gain the following flaw: "I’ve discovered that I really like killing people."'), // 96–100
        ],
    },
};

const command: Command = {
    name: 'madness',
    alias: ['flaw'],
    args: /(?<type>short|long)?/,
    description: 'Give a random madness to a player',
    usage: '[short|long|flaw] <...@user>',
    async run({ mentions, author }, { command, groups }) {
        const type = (command === 'flaw' ? 'flaw' : groups.type || 'short').toLowerCase();
        const users = mentions.users.filter((u) => !u.bot);
        if (0 === users.size) {
            throw new FriendlyError('You must assign a madness to a user.');
        }

        users.forEach(async (user) => {
            const mad = madness[type];
            const duration = `${mad.duration ? roll(mad.duration) : ''} ${mad.time}.`.trim();
            const message = `${sample(mad.options)} This lasts ${duration}`;

            await author.send(`${user.username} got the following madness: ${message}`);
            await user.send(message);
        });
    },
};

export default command;
