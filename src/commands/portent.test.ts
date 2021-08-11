import { Message } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import db from '../db';
import { FriendlyError } from '../error';
import command from './portent';

jest.mock('discord.js', () => ({
    Message: jest.fn().mockImplementation(() => ({
        author: { username: 'jdoe' },
        guild: { name: 'test' },
        delete: jest.fn(),
        reply: jest.fn(),
    })),
}));
jest.mock('../db');

const mockDb = mocked(db);

describe('_portent', () => {
    beforeEach(() => {
        mockDb.get.mockClear();
        mockDb.set.mockClear();
    });

    test('configuration', () => {
        expect(command.name).toEqual('portent');
        expect(command.description).toEqual('Manage portent dice for a Divination Wizard');
        expect(command.usage).toEqual('<show|roll|use> [d20]');
    });

    it('rolls portent dice', async () => {
        const message = new Message({} as never, {} as never);
        await command.run(message, { groups: { command: 'roll', roll: undefined } } as never);

        expect(message.delete).toHaveBeenCalled();
        expect(message.reply).toHaveBeenCalled();
        expect(mockDb.set.mock.calls[0][0]).toBe('test-jdoe');
        expect(mockDb.set.mock.calls[0][1]).toHaveLength(2);
    });

    it('shows saved portent dice', async () => {
        mockDb.get.mockResolvedValue([1, 20] as never);

        const message = new Message({} as never, {} as never);
        await command.run(message, { groups: { command: undefined, roll: undefined } } as never);

        expect(message.delete).toHaveBeenCalled();
        expect(message.reply).toHaveBeenCalledWith('1 & 20');
        expect(mockDb.get).toHaveBeenLastCalledWith('test-jdoe', []);
    });

    it('throws an error if no saved dice', async () => {
        mockDb.get.mockResolvedValue([] as never);

        const message = new Message({} as never, {} as never);
        await expect(
            command.run(message, { groups: { command: undefined, roll: undefined } } as never),
        ).rejects.toThrow(new FriendlyError("You don't have any portent rolls. Generate some with `portent roll`."));
    });

    it.each([
        [2, 3],
        [10, 10],
    ])('removes used dice [%d, %d]', async (a, b) => {
        mockDb.get.mockResolvedValue([a, b] as never);

        const message = new Message({} as never, {} as never);
        await command.run(message, { groups: { command: 'use', roll: String(a) } } as never);

        expect(message.delete).toHaveBeenCalled();
        expect(message.reply).toHaveBeenCalledWith(String(b));
        expect(mockDb.set).toHaveBeenLastCalledWith('test-jdoe', [b]);
    });

    it('throws an error if used dice not available', async () => {
        mockDb.get.mockResolvedValue([2]);

        const message = new Message({} as never, {} as never);
        await expect(command.run(message, { groups: { command: 'use', roll: '100' } } as never)).rejects.toThrow(
            new FriendlyError('No portent roll for 100. Available: 2'),
        );
    });
});
