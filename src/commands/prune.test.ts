import { Client, Guild, Message, TextChannel } from 'discord.js';

import { FriendlyError } from '../error';
import command from './prune';

const mocks = {
    delete: jest.fn(),
};

jest.mock('discord.js', () => ({
    Client: jest.fn(),
    Guild: jest.fn(),
    TextChannel: jest.fn(),
    Collection: jest.fn(),
    Message: jest.fn().mockImplementation(() => ({
        channel: {
            type: 'text',
            bulkDelete: mocks.delete,
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
    let message: Message;

    beforeEach(() => {
        mocks.delete.mockClear();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('deletes messages in text channels', async () => {
        await command.run(message, { command: 'prune', args: ['3'], match: [], groups: {} });
        expect(mocks.delete).toBeCalledWith(4, true);
    });

    it('throws an error if in a DM', async () => {
        message.channel.type = 'dm';

        try {
            await command.run(message, { command: 'prune', args: [], match: [], groups: {} });
            fail('expected error to be thrown');
        } catch (err) {
            expect(err).toBeInstanceOf(FriendlyError);
            expect(err.message).toEqual("I can't bulk delete DMs.");
        }
    });
});
