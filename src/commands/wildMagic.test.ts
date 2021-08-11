import { Message } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import command, { wildMagic } from './wildMagic';

jest.mock('discord.js');

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
    it('returns a wild magic event', async () => {
        const message = mocked(new Message({} as never, {} as never));
        await command.run(message, { command: 'wild', args: [], match: [], groups: {} });

        expect(message.delete).toHaveBeenCalledTimes(1);

        const event = message.reply.mock.calls[0][0];
        expect(wildMagic).toContainEqual(event);
    });

    it('returns a barbarian wild magic event', async () => {
        const message = new Message({} as never, {} as never);
        await command.run(message, {
            command: 'wild',
            args: [],
            match: [],
            groups: { barbarian: 'barbarian', roll: '7' },
        });
        expect(message.delete).toHaveBeenCalledTimes(1);
        expect(message.reply).toHaveBeenCalledWith(
            'Flowers and vines temporarily grow around you; until your rage ends, the ground within 15 feet of you is difficult terrain for your enemies.',
        );
    });

    it('returns a wild magic event for a dice roll', async () => {
        const message = new Message({} as never, {} as never);

        await command.run(message, { command: 'wild', args: [], match: [], groups: { roll: '89' } });
        expect(message.reply).toHaveBeenLastCalledWith(
            'You become invisible for the next minute. During that time, other creatures can’t hear you. The invisibility ends if you attack or cast a spell.',
        );

        await command.run(message, { command: 'wild', args: [], match: [], groups: { roll: '97' } });
        expect(message.reply).toHaveBeenLastCalledWith(
            'You are surrounded by faint, ethereal music for the next minute.',
        );

        expect(message.delete).toHaveBeenCalledTimes(2);
    });
});
