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
    Message: jest.fn().mockImplementation(() => ({
        delete: mocks.delete,
        reply: mocks.reply,
    })),
}));

describe('_wild configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('wild magic');
        expect(command.description).toEqual('Roll on the Wild Magic table');
        expect(command.usage).toEqual('[barbarian] [d100|d8]');
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
        await command.run(message, { command: 'wild', args: [], match: [], groups: {} });

        expect(mocks.delete).toHaveBeenCalledTimes(1);

        const event = mocks.reply.mock.calls[0][0];
        expect(wildMagic).toContainEqual(event);
    });

    it('returns a barbarian wild magic event', async () => {
        await command.run(message, {
            command: 'wild',
            args: [],
            match: [],
            groups: { barbarian: 'barbarian', roll: '7' },
        });
        expect(mocks.delete).toHaveBeenCalledTimes(1);
        expect(mocks.reply).toHaveBeenCalledWith(
            'Flowers and vines temporarily grow around you; until your rage ends, the ground within 15 feet of you is difficult terrain for your enemies.',
        );
    });

    it('returns a wild magic event for a dice roll', async () => {
        await command.run(message, { command: 'wild', args: [], match: [], groups: { roll: '89' } });
        expect(mocks.reply).toHaveBeenLastCalledWith(
            'You become invisible for the next minute. During that time, other creatures can’t hear you. The invisibility ends if you attack or cast a spell.',
        );

        await command.run(message, { command: 'wild', args: [], match: [], groups: { roll: '97' } });
        expect(mocks.reply).toHaveBeenLastCalledWith(
            'You are surrounded by faint, ethereal music for the next minute.',
        );

        expect(mocks.delete).toHaveBeenCalledTimes(2);
    });
});
