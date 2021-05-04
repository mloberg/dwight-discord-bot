import Command from '../command';
import { FriendlyError } from '../error';

export default new Command({
    name: 'prune',
    description: 'Prune messages from a channel',
    alias: ['purge'],
    usage: '<count>',
    async run(message, { args }) {
        if (message.channel.type === 'dm') {
            throw new FriendlyError("I can't bulk delete DMs.");
        }

        await message.channel.bulkDelete(Number(args[0]) + 1, true);
    },
});
