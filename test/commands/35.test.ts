import { Client, Collection, Guild, Message, TextChannel } from 'discord.js';

import command, { conversion } from '../../src/commands/35';
import { FriendlyError } from '../../src/error';

const mocks = {
    reply: jest.fn(),
};

jest.mock('discord.js', () => {
    return {
        Client: jest.fn(),
        Guild: jest.fn(),
        TextChannel: jest.fn(),
        Collection: jest.fn(),
        Message: jest.fn().mockImplementation(() => {
            return {
                reply: mocks.reply,
            };
        }),
    };
});

describe('__3.5 configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('3.5');
        expect(command.description).toEqual('3.5 to 5th edition skills conversion');
        expect(command.usage).toEqual('SKILL');
    });

    it('should have aliases', () => {
        expect(command.alias).toContain('35');
    });
});

describe('__3.5', () => {
    let message: Message;

    beforeEach(() => {
        mocks.reply.mockClear();
        mocks.reply.mockReturnThis();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it.each([
        [['use', 'rope'], 'DEX (Acrobatics)'],
        [['Use', 'Magic', 'Device'], 'INT (Arcana)'],
        [['Ride'], 'WIS (Animal Handling) or DEX (Acrobatics)'],
    ])('returns a comprable 5e skill for %s', async (search, result) => {
        await command.run(message, { _: search }, new Collection());

        expect(mocks.reply).toHaveBeenCalledTimes(1);
        expect(mocks.reply).toHaveBeenCalledWith(result);
    });

    it('has the correct conversions', () => {
        expect(conversion).toMatchSnapshot();
    });

    it('throws an error on invalid skill', async () => {
        try {
            await command.run(message, { _: ['foo'] }, new Collection());

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual('I couldn\'t find skill "foo".');
        }
    });
});
