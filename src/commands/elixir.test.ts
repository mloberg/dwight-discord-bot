import { Client, Guild, Message, TextChannel } from 'discord.js';

import command, { elixirs } from './elixir';

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

describe('_elixir configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('elixir');
        expect(command.description).toEqual('Craft an experimental elixir');
    });

    it('should have aliases', () => {
        expect(command.alias).toContain('elx');
    });
});

describe('_elixir', () => {
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

    it('returns an elixir', async () => {
        const reply = await command.run(message, { $0: 'elixir', _: [] });

        expect(mocks.delete).toHaveBeenCalledTimes(1);
        expect(reply).toBe(message);

        const elixir = mocks.reply.mock.calls[0][0];
        expect(elixirs).toContainEqual(elixir);
    });

    it('returns an elixir for a dice roll', async () => {
        const one = await command.run(message, { $0: 'elixir', _: ['1'] });
        const two = await command.run(message, { $0: 'elixir', _: [], roll: 4 });

        expect(mocks.delete).toHaveBeenCalledTimes(2);
        expect(one).toBe(message);
        expect(two).toBe(message);

        expect(mocks.reply).toHaveBeenCalledWith(
            '**Healing**. The drinker regains a number of hit points equal to 2d4 + your Intelligence modifier.',
        );
        expect(mocks.reply).toHaveBeenCalledWith(
            '**Boldness**. The drinker can roll a d4 and add the number rolled to every attack roll and saving throw they make for the next minute.',
        );
    });
});
