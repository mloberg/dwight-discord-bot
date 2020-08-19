import { Client, Guild, Message, TextChannel } from 'discord.js';

import command from '../../src/commands/help';
import { FriendlyError } from '../../src/error';

const { Collection } = jest.requireActual('discord.js');

const mocks = {
    send: jest.fn(),
};

jest.mock('discord.js', () => {
    return {
        Client: jest.fn(),
        Guild: jest.fn(),
        TextChannel: jest.fn(),
        Message: jest.fn().mockImplementation(() => {
            return {
                channel: {
                    send: mocks.send,
                },
            };
        }),
    };
});

describe('_help configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('help');
        expect(command.description).toEqual('Get help with commands');
        expect(command.usage).toEqual('[COMMAND]');
    });

    it('should have an alias', () => {
        expect(command.alias).toContain('commands');
    });
});

describe('_help', () => {
    let message: Message;
    const commands = new Collection();
    commands.set('basic', {
        name: 'basic',
        description: 'Basic command with no additional configuration',
        async run() {
            return null;
        },
    });
    commands.set('aliased', {
        name: 'aliased',
        description: 'Command with an alias',
        alias: ['foo', 'bar'],
        async run() {
            return null;
        },
    });
    commands.set('detailed', {
        name: 'detailed',
        description: 'Command with all configuration',
        alias: ['deets'],
        usage: 'FOO BAR',
        examples: ['foo', 'bar'],
        async run() {
            return null;
        },
    });

    beforeEach(() => {
        mocks.send.mockClear();
        mocks.send.mockReturnThis();

        const client = new Client();
        const guild = new Guild(client, {});
        const channel = new TextChannel(guild, {});
        message = new Message(client, {}, channel);
    });

    it('returns a list of all commands', async () => {
        const reply = await command.run(message, { _: [] }, commands);

        expect(reply).toEqual(message.channel);
        expect(mocks.send).toBeCalledWith(
            [
                'Here is a list of available commands:',
                'basic, aliased, detailed',
                'Get more details with "_help [command]"',
            ],
            { split: true },
        );
    });

    it.each([
        ['basic', ['**basic**: Basic command with no additional configuration']],
        ['aliased', ['**aliased**: Command with an alias', '*aliases*: foo, bar']],
        [
            'detailed',
            [
                '**detailed**: Command with all configuration',
                '*aliases*: deets',
                '*usage*: `_detailed FOO BAR`',
                '*examples*: `_detailed foo`, `_detailed bar`',
            ],
        ],
    ])('returns the details for a %s command', async (cmd, help) => {
        const reply = await command.run(message, { _: [cmd] }, commands);

        expect(reply).toEqual(message.channel);
        expect(mocks.send).toBeCalledWith(help, { split: true });
    });

    it('returns an error if an invalid command is given', async () => {
        try {
            await command.run(message, { _: ['invalid'] }, commands);

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual('No command for "invalid" found.');
        }
    });
});
