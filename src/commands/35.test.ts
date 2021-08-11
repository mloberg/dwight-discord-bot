import { Message } from 'discord.js';

import { FriendlyError } from '../error';
import command, { conversion } from './35';

jest.mock('discord.js');

describe('_3.5 configuration', () => {
    it('should have basic command infomation', () => {
        expect(command.name).toEqual('3.5');
        expect(command.description).toEqual('3.5 to 5th edition skills conversion');
        expect(command.usage).toEqual('<skill>');
    });

    it('should have aliases', () => {
        expect(command.alias).toContain('35');
    });
});

describe('_3.5', () => {
    it.each([
        ['use rope', 'DEX (Acrobatics)'],
        ['Use Magic Device', 'INT (Arcana)'],
        ['Ride', 'WIS (Animal Handling) or DEX (Acrobatics)'],
    ])('returns a comprable 5e skill for %s', async (skill, result) => {
        const message = new Message({} as never, {} as never);

        await command.run(message, { command: '3.5', args: [], match: [], groups: { skill } });

        expect(message.reply).toHaveBeenCalledTimes(1);
        expect(message.reply).toHaveBeenCalledWith(result);
    });

    it('has the correct conversions', () => {
        expect(conversion).toMatchSnapshot();
    });

    it('throws an error on invalid skill', async () => {
        const message = new Message({} as never, {} as never);

        try {
            await command.run(message, { command: '3.5', args: [], match: [], groups: { skill: 'foo' } });

            fail('expected error to be thrown');
        } catch (err) {
            expect(err instanceof FriendlyError).toBe(true);
            expect(err.message).toEqual('I couldn\'t find skill "foo".');
        }
    });
});
