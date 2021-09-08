import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { pull, sample, sampleSize } from 'lodash';

import database from '../database';
import { FriendlyError } from '../error';

const deck = {
    Sun: 'You gain 50,000 XP, and a wondrous item (which the GM determines randomly) appears in your hands.',
    Moon: 'You are granted the ability to cast the wish spell 1d3 times.',
    Star: "Increase one of your ability scores by 2. The score can exceed 20 but can't exceed 24.",
    Throne: 'You gain proficiency in the Persuasion skill, and you double your proficiency bonus on checks made with that skill. In addition, you gain rightful ownership of a small keep somewhere in the world. However, the keep is currently in the hands of monsters, which you must clear out before you can claim the keep as yours.',
    Key: 'A rare or rarer magic weapon with which you are proficient appears in your hands. The GM chooses the weapon.',
    Knight: 'You gain the service of a 4th-level fighter who appears in a space you choose within 30 feet of you. The fighter is of the same race as you and serves you loyally until death, believing the fates have drawn him or her to you. You control this character.',
    'The Void':
        "This black card spells disaster. Your soul is drawn from your body and contained in an object in a place of the GM's choice. One or more powerful beings guard the place. While your soul is trapped in this way, your body is incapacitated. A wish spell can't restore your soul, but the spell reveals the location of the object that holds it. You draw no more cards.",
    Flames: 'A powerful devil becomes your enemy. The devil seeks your ruin and plagues your life, savoring your suffering before attempting to slay you. This enmity lasts until either you or the devil dies.',
    Skull: "You summon an avatar of death--a ghostly humanoid skeleton clad in a tattered black robe and carrying a spectral scythe. It appears in a space of the GM's choice within 10 feet of you and attacks you, warning all others that you must win the battle alone. The avatar fights until you die or it drops to 0 hit points, whereupon it disappears. If anyone tries to help you, the helper summons its own avatar of death. A creature slain by an avatar of death can't be restored to life.",
    Ruin: 'All forms of wealth that you carry or own, other than magic items, are lost to you. Portable property vanishes. Businesses, buildings, and land you own are lost in a way that alters reality the least. Any documentation that proves you should own something lost to this card also disappears.',
    Euryale:
        "The card's medusa-like visage curses you. You take a −2 penalty on saving throws while cursed in this way. Only a god or the magic of The Fates card can end this curse.",
    Rogue: "A nonplayer character of the GM's choice becomes hostile toward you. The identity of your new enemy isn't known until the NPC or someone else reveals it. Nothing less than a wish spell or divine intervention can end the NPC's hostility toward you.",
    Jester: 'You gain 10,000 XP, or you can draw two additional cards beyond your declared draws.',
};
const fullDeck = {
    ...deck,
    Vizier: 'At any time you choose within one year of drawing this card, you can ask a question in meditation and mentally receive a truthful answer to that question. Besides information, the answer helps you solve a puzzling problem or other dilemma. In other words, the knowledge comes with wisdom on how to apply it.',
    Comet: 'If you single-handedly defeat the next hostile monster or group of monsters you encounter, you gain experience points enough to gain one level. Otherwise, this card has no effect.',
    'The Fates':
        "Reality's fabric unravels and spins anew, allowing you to avoid or erase one event as if it never happened. You can use the card's magic as soon as you draw the card or at any other time before you die.",
    Gem: 'Twenty-five pieces of jewelry worth 2,000 gp each or fifty gems worth 1,000 gp each appear at your feet.',
    Talons: "Every magic item you wear or carry disintegrates. Artifacts in your possession aren't destroyed but do vanish.",
    Idiot: 'Permanently reduce your Intelligence by 1d4 + 1 (to a minimum score of 1). You can draw one additional card beyond your declared draws.',
    Donjon: "You disappear and become entombed in a state of suspended animation in an extradimensional sphere. Everything you were wearing and carrying stays behind in the space you occupied when you disappeared. You remain imprisoned until you are found and removed from the sphere. You can't be located by any divination magic, but a wish spell can reveal the location of your prison. You draw no more cards.",
    Balance:
        'Your mind suffers a wrenching alteration, causing your alignment to change. Lawful becomes chaotic, good becomes evil, and vice versa. If you are true neutral or unaligned, this card has no effect on you.',
    Fool: 'You lose 10,000 XP, discard this card, and draw from the deck again, counting both draws as one of your declared draws. If losing that much XP would cause you to lose a level, you instead lose an amount that leaves you with just enough XP to keep your level.',
};

type Card = keyof typeof fullDeck;

export default {
    config: new SlashCommandBuilder()
        .setName('many')
        .setDescription('Pull from the Deck of Many Things')
        .addSubcommand((option) =>
            option
                .setName('new')
                .setDescription('Create a new deck to pull from')
                .addBooleanOption((option) => option.setName('full').setDescription('Create a twenty-two card deck'))
                .addIntegerOption((option) =>
                    option.setName('missing').setDescription('Generate a deck with some random missing cards'),
                ),
        )
        .addSubcommand((option) => option.setName('pull').setDescription('Pull a card from the deck')),
    async handle(command: CommandInteraction): Promise<void> {
        const sub = command.options.getSubcommand();
        const key = `many:${command.guild ? command.guild.id : command.user.id}`;

        if (sub === 'new') {
            const cards = Object.keys(command.options.getBoolean('full') ? fullDeck : deck);
            const missing = command.options.getInteger('missing') || 0;

            await database.set(key, sampleSize(cards, cards.length - missing));
            await command.reply('You find a mysterious deck of cards.');
            return;
        }

        const cards = (await database.get(key, [])) as Card[];
        const card = sample(cards);
        if (!card) {
            throw new FriendlyError('Unable to draw a card.');
        }

        if (card === 'Fool' || card === 'Jester') {
            pull(cards, card);
        }

        await database.set(key, cards);
        await command.reply(`**${card}** ${fullDeck[card]}`);
    },
};
