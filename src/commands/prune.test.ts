import { CommandInteraction, TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import prune from './prune';

jest.mock('discord.js', () => ({
    CommandInteraction: jest.fn().mockImplementation(() => ({
        reply: jest.fn(),
        channel: {
            type: 'GUILD_TEXT',
            bulkDelete: jest.fn(),
        },
        options: {
            getInteger: jest.fn(),
        },
    })),
}));

describe('/prune', () => {
    it('is a slash command', () => {
        expect(prune).toMatchSnapshot();
    });

    it('prunes messages', async () => {
        const command = jest.mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getInteger.mockReturnValue(3);

        await prune.handle(command);
        expect(command.reply).toHaveBeenCalledWith('...');
        expect((command.channel as TextChannel).bulkDelete).toHaveBeenCalledWith(4);
    });

    it('throws errors in non text channels', async () => {
        const command = new CommandInteraction({} as never, {} as never);
        if (command.channel) command.channel.type = 'DM';

        await expect(prune.handle(command)).rejects.toMatchError(
            new FriendlyError("I can't bulk delete messages in this channel."),
        );
    });
});
