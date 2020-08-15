import { Client, Collection, Guild, Message, TextChannel } from 'discord.js';

import command from '../../src/commands/ping';

const mocks = {
    send: jest.fn(),
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
                    send: mocks.send,
                },
            };
        }),
    };
});

describe('__ping configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('ping');
        expect(command.description).toEqual('Pong');
    });

    it('should have no aliases', () => {
        expect(command.alias).toBeUndefined();
    });
});

describe('__ping', () => {
    let message: Message;

    beforeEach(() => {
        mocks.send.mockClear();
        mocks.send.mockReturnThis();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('responds', async () => {
        await command.run(message, { _: [] }, new Collection());

        expect(mocks.send).toBeCalledWith('pong');
    });
});
