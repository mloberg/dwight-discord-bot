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
    Message: jest.fn().mockImplementation(() => ({
        delete: mocks.delete,
        reply: mocks.reply,
    })),
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
        await command.run(message, { command: 'elixir', args: [], match: [], groups: {} });

        expect(mocks.delete).toHaveBeenCalledTimes(1);

        const elixir = mocks.reply.mock.calls[0][0];
        expect(elixirs).toContainEqual(elixir);
    });

    it('returns an elixir for a dice roll', async () => {
        await command.run(message, { command: 'elixir', args: [], match: [], groups: { roll: '1' } });

        expect(mocks.delete).toHaveBeenCalledTimes(1);
        expect(mocks.reply).toHaveBeenCalledWith(
            '**Healing**. The drinker regains a number of hit points equal to 2d4 + your Intelligence modifier.',
        );
    });
});
