import Command from '../command';
import db from '../db';
import { FriendlyError } from '../error';
import { roll } from '../utils';

export default new Command({
    name: 'portent',
    description: 'Manage portent dice for a Divination Wizard',
    usage: '<show|roll|use> [d20]',
    args: /(?<command>use|roll|show|list) ?(?<roll>\d+)?/,
    examples: ['show', 'roll', 'use 16'],
    async run(message, { groups }) {
        const key = `${message.guild?.name}-${message.author.username}`;
        const results: number[] = groups.command === 'roll' ? [roll('d20'), roll('d20')] : await db.get(key, []);

        if (!results || !results.length) {
            throw new FriendlyError("You don't have any portent rolls. Generate some with `portent roll`.");
        }

        const used = Number(groups.roll);
        if (used) {
            const idx = results.indexOf(used);
            if (idx === -1) {
                throw new FriendlyError(`No portent roll for ${used}. Available: ${results.join(' & ')}`);
            }

            results.splice(idx, 1);
        }

        await db.set(key, results);
        await message.delete();

        return message.reply(results.join(' & '));
    },
});
