import { CommandInteraction, TextChannel } from 'discord.js';
import { mocked } from 'ts-jest/utils';

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
        const command = mocked(new CommandInteraction({} as never, {} as never), true);
        command.options.getInteger.mockReturnValue(3);

        await prune.run(command);
        expect(command.reply).toBeCalledWith('...');
        expect((command.channel as TextChannel).bulkDelete).toHaveBeenCalledWith(4);
    });

    it('throws errors in non text channels', async () => {
        const command = new CommandInteraction({} as never, {} as never);
        if (command.channel) command.channel.type = 'DM';

        await expect(prune.run(command)).rejects.toThrowError(
            new FriendlyError("I can't bulk delete messages in this channel."),
        );
    });
});
