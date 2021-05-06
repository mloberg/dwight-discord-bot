import { Client, Message, TextChannel } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import db from '../db';
import { FriendlyError } from '../error';
import command from './portent';

const mocks = {
    db: mocked(db),
    delete: jest.fn(),
    reply: jest.fn(),
};

jest.mock('discord.js', () => ({
    Message: jest.fn().mockImplementation(() => ({
        author: { username: 'jdoe' },
        guild: { name: 'test' },
        delete: mocks.delete,
        reply: mocks.reply,
    })),
}));
jest.mock('../db');

describe('_portent', () => {
    let message: Message;

    beforeEach(() => {
        mocks.delete.mockClear();
        mocks.reply.mockClear();
        mocks.db.get.mockClear();
        mocks.db.set.mockClear();

        message = new Message({} as Client, {}, {} as TextChannel);
    });

    test('configuration', () => {
        expect(command.name).toEqual('portent');
        expect(command.description).toEqual('Manage portent dice for a Divination Wizard');
        expect(command.usage).toEqual('<show|roll|use> [d20]');
    });

    it('rolls portent dice', async () => {
        await command.run(message, { groups: { command: 'roll', roll: undefined } } as never);

        expect(message.delete).toHaveBeenCalled();
        expect(message.reply).toHaveBeenCalled();
        expect(mocks.db.set.mock.calls[0][0]).toBe('test-jdoe');
        expect(mocks.db.set.mock.calls[0][1]).toHaveLength(2);
    });

    it('shows saved portent dice', async () => {
        mocks.db.get.mockResolvedValue([1, 20]);

        await command.run(message, { groups: { command: undefined, roll: undefined } } as never);

        expect(message.delete).toHaveBeenCalled();
        expect(message.reply).toHaveBeenCalledWith('1 & 20');
        expect(mocks.db.get).toHaveBeenLastCalledWith('test-jdoe', []);
    });

    it('throws an error if no saved dice', async () => {
        mocks.db.get.mockResolvedValue([]);

        await expect(
            command.run(message, { groups: { command: undefined, roll: undefined } } as never),
        ).rejects.toThrow(new FriendlyError("You don't have any portent rolls. Generate some with `portent roll`."));
    });

    it.each([
        [2, 3],
        [10, 10],
    ])('removes used dice [%d, %d]', async (a, b) => {
        mocks.db.get.mockResolvedValue([a, b]);

        await command.run(message, { groups: { command: 'use', roll: String(a) } } as never);

        expect(message.delete).toHaveBeenCalled();
        expect(message.reply).toHaveBeenCalledWith(String(b));
        expect(mocks.db.set).toHaveBeenLastCalledWith('test-jdoe', [b]);
    });

    it('throws an error if used dice not available', async () => {
        mocks.db.get.mockResolvedValue([2]);

        await expect(command.run(message, { groups: { command: 'use', roll: '100' } } as never)).rejects.toThrow(
            new FriendlyError('No portent roll for 100. Available: 2'),
        );
    });
});
