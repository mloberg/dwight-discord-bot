import { TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import prune from './prune';

describe('/prune', () => {
    it('is a slash command', () => {
        expect(prune).toMatchSnapshot();
    });

    it('prunes messages', async () => {
        const command = createMockCommand({ channel: { type: 'GUILD_TEXT', bulkDelete: jest.fn() } });
        command.options.getInteger.mockReturnValue(3);

        await prune.handle(command);
        expect(command.reply).toHaveBeenCalledWith('...');
        expect((command.channel as TextChannel).bulkDelete).toHaveBeenCalledWith(4);
    });

    it('throws errors in non text channels', async () => {
        const command = createMockCommand({ channel: { type: 'DM', bulkDelete: jest.fn() } });

        await expect(prune.handle(command)).rejects.toMatchError(
            new FriendlyError("I can't bulk delete messages in this channel."),
        );
    });
});
