import { Message } from 'discord.js';

import spellList from '../data/spells';
import { Arguments, Command } from '../types';
import { random, ucfirst } from '../utils';

const command: Command = {
    name: 'spell-info',
    description: 'Get info about a spell',
    alias: ['s'],
    usage: 'SPELL',
    examples: ['wish'],
    async run(message: Message, args: Arguments): Promise<Message> {
        const name = args._.join(' ');
        const spells = await spellList();
        const results = spells.filter(s => s.spell.toLowerCase() === name.toLowerCase());

        if (!results) {
            return message.reply(`I couldn't find a spell for ${name}`);
        }

        const spell = results[0];

        await message.delete();

        return message.channel.send([
            `**Spell**: ${spell.spell}`,
            `**Level**: ${spell.level}`,
            `**School**: ${spell.school}`,
            `**Class**: ${spell.class.join(', ')}`,
        ], { split: true });
    },
};

export default command;
