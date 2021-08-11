import { Message } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import command, { events } from './event';

jest.mock('discord.js', () => ({
    Message: jest.fn().mockImplementation(() => ({
        delete: jest.fn(),
        channel: {
            send: jest.fn(),
        },
    })),
}));

describe('_event configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('event');
        expect(command.description).toEqual('Trigger a random event');
        expect(command.alias).toEqual([]);
    });
});

describe('_event', () => {
    it('returns a random event', async () => {
        const message = mocked(new Message({} as never, {} as never), true);

        await command.run(message, { command: 'event', args: [], match: [], groups: {} });

        expect(message.delete).toHaveBeenCalledTimes(1);

        const event = message.channel.send.mock.calls[0][0];
        expect(events).toContainEqual(event);
    });
});
