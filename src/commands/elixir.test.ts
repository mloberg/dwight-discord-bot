import { Message } from 'discord.js';
import { mocked } from 'ts-jest/utils';

import command, { elixirs } from './elixir';

jest.mock('discord.js');

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
    it('returns an elixir', async () => {
        const message = mocked(new Message({} as never, {} as never));

        await command.run(message, { command: 'elixir', args: [], match: [], groups: {} });

        expect(message.delete).toHaveBeenCalledTimes(1);

        const elixir = message.reply.mock.calls[0][0];
        expect(elixirs).toContainEqual(elixir);
    });

    it('returns an elixir for a dice roll', async () => {
        const message = new Message({} as never, {} as never);

        await command.run(message, { command: 'elixir', args: [], match: [], groups: { roll: '1' } });

        expect(message.delete).toHaveBeenCalledTimes(1);
        expect(message.reply).toHaveBeenCalledWith(
            '**Healing**. The drinker regains a number of hit points equal to 2d4 + your Intelligence modifier.',
        );
    });
});
