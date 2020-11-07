import { Client, Guild, Message, TextChannel } from 'discord.js';

import command, { wildMagic } from './wildMagic';

const mocks = {
    delete: jest.fn(),
    reply: jest.fn(),
};

jest.mock('discord.js', () => ({
    Client: jest.fn(),
    Guild: jest.fn(),
    TextChannel: jest.fn(),
    Collection: jest.fn(),
    Message: jest.fn().mockImplementation(() => {
        return {
            delete: mocks.delete,
            reply: mocks.reply,
        };
    }),
}));

describe('_wild configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('wild');
        expect(command.description).toEqual('Roll on the Wild Magic table');
        expect(command.usage).toEqual('[ROLL]');
    });

    it('should have aliases', () => {
        expect(command.alias).toContain('wild-magic');
    });
});

describe('_wild', () => {
    let message: Message;

    beforeEach(() => {
        mocks.delete.mockClear();
        mocks.reply.mockClear();
        mocks.reply.mockReturnThis();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('returns a wild magic event', async () => {
        const reply = await command.run(message, { $0: 'wild', _: [] });

        expect(mocks.delete).toHaveBeenCalledTimes(1);
        expect(reply).toBe(message);

        const event = mocks.reply.mock.calls[0][0];
        expect(wildMagic).toContainEqual(event);
    });

    it('returns a wild magic event for a dice roll', async () => {
        const one = await command.run(message, { $0: 'wild', _: ['89'] });
        const two = await command.run(message, { $0: 'wild', _: [], roll: 97 });

        expect(mocks.delete).toHaveBeenCalledTimes(2);
        expect(one).toBe(message);
        expect(two).toBe(message);

        expect(mocks.reply).toHaveBeenCalledWith(
            'You become invisible for the next minute. During that time, other creatures can’t hear you. The invisibility ends if you attack or cast a spell.',
        );
        expect(mocks.reply).toHaveBeenCalledWith('You are surrounded by faint, ethereal music for the next minute.');
    });
});
