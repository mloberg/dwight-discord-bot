import { Message } from 'discord.js';

import command from './ping';

jest.mock('discord.js');

describe('_ping configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('ping');
        expect(command.description).toEqual('Pong');
        expect(command.alias).toEqual([]);
    });
});

describe('_ping', () => {
    it('responds', async () => {
        const message = new Message({} as never, {} as never);

        await command.run(message, { command: 'ping', args: [], match: [], groups: {} });
        expect(message.react).toBeCalledWith('🏓');
    });
});
