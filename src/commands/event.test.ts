import { Client, Guild, Message, TextChannel } from 'discord.js';

import command, { events } from './event';

const mocks = {
    delete: jest.fn(),
    send: jest.fn(),
};

jest.mock('discord.js', () => ({
    Client: jest.fn(),
    Guild: jest.fn(),
    TextChannel: jest.fn(),
    Collection: jest.fn(),
    Message: jest.fn().mockImplementation(() => ({
        delete: mocks.delete,
        channel: {
            send: mocks.send,
        },
    })),
}));

describe('_event configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('event');
        expect(command.description).toEqual('Trigger a random event');
    });

    it('should have no aliases', () => {
        expect(command.alias).toBeUndefined();
    });
});

describe('_event', () => {
    let message: Message;

    beforeEach(() => {
        mocks.delete.mockClear();
        mocks.send.mockClear();
        mocks.send.mockReturnThis();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('returns a random event', async () => {
        await command.run(message, { command: 'event', args: [], match: [], groups: {} });

        expect(mocks.delete).toHaveBeenCalledTimes(1);

        const event = mocks.send.mock.calls[0][0];
        expect(events).toContainEqual(event);
    });
});
