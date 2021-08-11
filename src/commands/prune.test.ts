import { Message, TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import command from './prune';

jest.mock('discord.js', () => ({
    Message: jest.fn().mockImplementation(() => ({
        channel: {
            type: 'text',
            bulkDelete: jest.fn(),
        },
    })),
}));

describe('_prune configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('prune');
        expect(command.description).toEqual('Prune messages from a channel');
        expect(command.usage).toEqual('<count>');
    });

    it('should have a purge alias', () => {
        expect(command.alias).toContain('purge');
    });
});

describe('_ping', () => {
    it('deletes messages in text channels', async () => {
        const message = new Message({} as never, {} as never);

        await command.run(message, { command: 'prune', args: ['3'], match: [], groups: {} });

        expect((message.channel as TextChannel).bulkDelete).toBeCalledWith(4, true);
    });

    it('throws an error if in a DM', async () => {
        const message = new Message({} as never, {} as never);
        message.channel.type = 'DM';

        try {
            await command.run(message, { command: 'prune', args: [], match: [], groups: {} });
            fail('expected error to be thrown');
        } catch (err) {
            expect(err).toBeInstanceOf(FriendlyError);
            expect(err.message).toEqual("I can't bulk delete DMs.");
        }
    });
});
