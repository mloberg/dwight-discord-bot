import { User } from "discord.js";

import Command from "../command";
import db from "../db";

const longTermMaddness = [ // some of these are repeated to make sure some of the bad effects aren't as common
    "You feel compelled to repeat a specific activity over and over, such as washing hands, touching things, praying, or counting coins.",
    "You feel compelled to repeat a specific activity over and over, such as washing hands, touching things, praying, or counting coins.",
    "You feel compelled to repeat a specific activity over and over, such as washing hands, touching things, praying, or counting coins.",
    "You feel compelled to repeat a specific activity over and over, such as washing hands, touching things, praying, or counting coins.",
    "You experience vivid hallucinations and has disadvantage on ability checks.",
    "You experience vivid hallucinations and has disadvantage on ability checks.",
    "You experience vivid hallucinations and has disadvantage on ability checks.",
    "You suffer extreme paranoia. You have disadvantage on Wisdom and Charisma checks.",
    "You suffer extreme paranoia. You have disadvantage on Wisdom and Charisma checks.",
    "You suffer extreme paranoia. You have disadvantage on Wisdom and Charisma checks.",
    "You suffer extreme paranoia. You have disadvantage on Wisdom and Charisma checks.",
    "You regard the fog with intense revulsion, as if affected by the antipathy effect of the antipathy/sympathy spell. (https://www.dndbeyond.com/spells/antipathy-sympathy)",
    "You regard the fog with intense revulsion, as if affected by the antipathy effect of the antipathy/sympathy spell. (https://www.dndbeyond.com/spells/antipathy-sympathy)",
    "You regard the fog with intense revulsion, as if affected by the antipathy effect of the antipathy/sympathy spell. (https://www.dndbeyond.com/spells/antipathy-sympathy)",
    "You regard the fog with intense revulsion, as if affected by the antipathy effect of the antipathy/sympathy spell. (https://www.dndbeyond.com/spells/antipathy-sympathy)",
    "You experience a powerful delusion. You imagine that you are under the effects of a Potion of Invisibility. (https://www.dndbeyond.com/magic-items/potion-of-invisibility)",
    "You experience a powerful delusion. You imagine that you are under the effects of a Potion of Flying. (https://www.dndbeyond.com/magic-items/potion-of-flying)",
    "You experience a powerful delusion. You imagine that you are under the effects of a Potion of Climbing. (https://www.dndbeyond.com/magic-items/potion-of-climbing)",
    "You experience a powerful delusion. You imagine that you are under the effects of a Potion of Giant Size. (https://www.dndbeyond.com/magic-items/potion-of-giant-size)",
    "You become attached to a “lucky charm,” such as a person or an object, and have disadvantage on attack rolls, ability checks, and saving throws while more than 30 feet from it.",
    "You become attached to a “lucky charm,” such as a person or an object, and have disadvantage on attack rolls, ability checks, and saving throws while more than 30 feet from it.",
    "You become attached to a “lucky charm,” such as a person or an object, and have disadvantage on attack rolls, ability checks, and saving throws while more than 30 feet from it.",
    "You become attached to a “lucky charm,” such as a person or an object, and have disadvantage on attack rolls, ability checks, and saving throws while more than 30 feet from it.",
    "You are blinded.",
    "You are blinded.",
    "You are defeaned.",
    "You are defeaned.",
    "You are defeaned.",
    "You experience uncontrollable tremors or tics, which impose disadvantage on attack rolls, ability checks, and saving throws that involve Strength or Dexterity.",
    "You experience uncontrollable tremors or tics, which impose disadvantage on attack rolls, ability checks, and saving throws that involve Strength or Dexterity.",
    "You suffer from partial amnesia. You know who you are and retains racial traits and class features, but doesn’t recognize other people or remember anything that happened before the madness took effect.",
    "You suffer from partial amnesia. You know who you are and retains racial traits and class features, but doesn’t recognize other people or remember anything that happened before the madness took effect.",
    "Whenever you take damage, you must succeed on a DC 15 Wisdom saving throw or be affected as though you failed a saving throw against the confusion spell. The confusion effect lasts for 1 minute. (https://www.dndbeyond.com/spells/confusion)",
    "Whenever you take damage, you must succeed on a DC 15 Wisdom saving throw or be affected as though you failed a saving throw against the confusion spell. The confusion effect lasts for 1 minute. (https://www.dndbeyond.com/spells/confusion)",
    "You lose the ability to speak.",
    "You lose the ability to speak.",
    "You fall unconscious. No amount of jostling or damage can wake you."
];

const shortTermMaddness = [
    "You retreat into your mind and become paralyzed. The effect ends if you take any damage. (https://www.dndbeyond.com/sources/basic-rules/appendix-a-conditions#Paralyzed)",
    "You become incapacitated and spend the duration screaming, laughing, or weeping. (https://www.dndbeyond.com/sources/basic-rules/appendix-a-conditions#Incapacitated)",
    "You become frightened and must use your action and movement each round to flee from the source of the fear. (https://www.dndbeyond.com/sources/basic-rules/appendix-a-conditions#Frightened)",
    "You begin babbling and are incapable of normal speech or spellcasting.",
    "You must use your action each round to attack the nearest creature.",
    "You experience vivid hallucinations and have disadvantage on ability checks.",
    "You do whatever anyone tells you to do that isn’t obviously self-destructive.",
    "You experience an overpowering urge to eat something strange such as dirt, slime, or offal.",
    "You are stunned. (https://www.dndbeyond.com/sources/basic-rules/appendix-a-conditions#Stunned)",
    "You fall unconscious. (https://www.dndbeyond.com/sources/basic-rules/appendix-a-conditions#Unconscious)",
];

const flaws = [
    "Being drunk keeps me sane.",
    "I keep whatever I find.",
    "I try to become more like someone else I know — adopting his or her style of dress, mannerisms, and name.",
    "I must bend the truth, exaggerate, or outright lie to be interesting to other people.",
    "Achieving my goal is the only thing of interest to me, and I’ll ignore everything else to pursue it.",
    "I find it hard to care about anything that goes on around me.",
    "I don’t like the way people judge me all the time.",
    "I am the smartest, wisest, strongest, fastest, and most beautiful person I know.",
    "I am convinced that powerful enemies are hunting me, and their agents are everywhere I go. I am sure they’re watching me all the time.",
    "There’s only one person I can trust. And only I can see this special friend.",
    "I can’t take anything seriously. The more serious the situation, the funnier I find it.",
    "I’ve discovered that I really like killing people.",
];

const rand = (items: string[]) => {
    return items[Math.floor(Math.random() * items.length)];
};

const _d = (dice: number): number => {
    return Math.floor(Math.random() * (dice - 1 + 1)) + 1;
};

export default class extends Command {
    constructor(client) {
        super(client, {
            name: "fog",
            description: "Check if the fog has effected you.",
        });
    }

    async run(message, args) {
        const input = String(args._[0]);
        const crit = input.startsWith("!");
        const roll = Number(input.replace(/^!/, ""));
        if (isNaN(roll) || roll < 0) {
            throw new TypeError("please give me a valid number.");
        }

        let count = Number(await db.get(message.author.username) || 0);

        if (1 === roll && crit) {
            this.condition(message.author, `${rand(shortTermMaddness)}\nThis effect lasts for ${_d(10)} minute(s).`);
        }

        if (roll < 15) {
            count++;
        }

        await db.set(message.author.username, count);

        if (roll < 13) {
            message.reply(`You take ${_d(4)} point(s) of posion damage.`);
        }

        if (20 === count) {
            console.log(`${message.author.username} has developed a disease!`);
        } else if (50 === count) {
            this.condition(message.author, `You have developed a new flaw: ${rand(flaws)}`);
        } else if (0 === count % 10) {
            this.condition(message.author, `${rand(longTermMaddness)}\nThis effect lasts for ${_d(10)} hour(s).`);
        } else if (0 === count % 5) {
            this.condition(message.author, `${rand(shortTermMaddness)}\nThis effect lasts for ${_d(10)} minute(s).`);
        }
    }

    private condition(author: User, effect: string) {
        console.log(`${author.username}: ${effect}`);
        author.send(effect);
    }
}
