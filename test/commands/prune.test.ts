import { Client, Collection, Guild, Message, TextChannel } from 'discord.js';

import command from '../../src/commands/prune';
import { FriendlyError } from '../../src/error';

const mocks = {
    delete: jest.fn(),
};

jest.mock('discord.js', () => {
    return {
        Client: jest.fn(),
        Guild: jest.fn(),
        TextChannel: jest.fn(),
        Collection: jest.fn(),
        Message: jest.fn().mockImplementation(() => {
            return {
                channel: {
                    type: 'text',
                    bulkDelete: mocks.delete,
                },
            };
        }),
    };
});

describe('_prune configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('prune');
        expect(command.description).toEqual('Prune messages from a channel');
        expect(command.usage).toEqual('COUNT');
    });

    it('should have no aliases', () => {
        expect(command.alias).toBeUndefined();
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
        await command.run(message, { _: ['3'] }, new Collection());

        expect(mocks.delete).toBeCalledWith(4, true);
    });

    it('throws an error if in a DM', async () => {
        message.channel.type = 'dm';

        try {
            await command.run(message, { _: ['3'] }, new Collection());

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual("I can't bulk delete in DMs.");
        }
    });
});
