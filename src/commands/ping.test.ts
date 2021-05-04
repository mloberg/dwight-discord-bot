import { Client, Guild, Message, TextChannel } from 'discord.js';

import command from './ping';

const mocks = {
    react: jest.fn(),
};

jest.mock('discord.js', () => ({
    Client: jest.fn(),
    Guild: jest.fn(),
    TextChannel: jest.fn(),
    Collection: jest.fn(),
    Message: jest.fn().mockImplementation(() => ({
        react: mocks.react,
    })),
}));

describe('_ping configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('ping');
        expect(command.description).toEqual('Pong');
        expect(command.alias).toEqual([]);
    });
});

describe('_ping', () => {
    let message: Message;

    beforeEach(() => {
        mocks.react.mockClear();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('responds', async () => {
        await command.run(message, { command: 'ping', args: [], match: [], groups: {} });
        expect(mocks.react).toBeCalledWith('🏓');
    });
});
