import { Client, Collection, Guild, Message, TextChannel } from 'discord.js';

import command from '../../src/commands/prune';

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
                    bulkDelete: mocks.delete,
                },
            };
        }),
    };
});

describe('__prune configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('prune');
        expect(command.description).toEqual('Prune messages from a channel');
        expect(command.usage).toEqual('COUNT');
    });

    it('should have no aliases', () => {
        expect(command.alias).toBeUndefined();
    });
});

describe('__ping', () => {
    let message: Message;

    beforeEach(() => {
        mocks.delete.mockClear();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('deletes messages', async () => {
        await command.run(message, { _: ['3'] }, new Collection());

        expect(mocks.delete).toBeCalledWith(4, true);
    });
});
