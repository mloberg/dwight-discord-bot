import db from '../db';
import { FriendlyError } from '../error';
import { SlashCommand } from '../types';
import { roll } from '../utils';

const portent: SlashCommand = {
    name: 'portent',
    description: 'Manage portent dice for a Divination Wizard',
    options: [
        {
            name: 'show',
            description: 'Show available portent dice',
            type: 'SUB_COMMAND',
        },
        {
            name: 'roll',
            description: 'Roll new portent dice',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'one',
                    description: 'Value of first die',
                    type: 'INTEGER',
                },
                {
                    name: 'two',
                    description: 'Value of second die',
                    type: 'INTEGER',
                },
                {
                    name: 'three',
                    description: 'Value of third die (greater portent)',
                    type: 'INTEGER',
                },
                {
                    name: 'greater',
                    description: 'Roll three dice instead of two',
                    type: 'BOOLEAN',
                },
            ],
        },
        {
            name: 'use',
            description: 'Use a portent die',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'dice',
                    description: 'Die value to use',
                    type: 'INTEGER',
                    required: true,
                },
            ],
        },
    ],
    async run(command) {
        const sub = command.options.getSubcommand();
        const key = `${command.guild?.id}-${command.user.id}`;
        const dice: number[] = (await db.get(key)) || [];

        if (sub === 'show') {
            await command.reply(dice.length ? dice.join(', ') : 'No available portent dice.');
            return;
        }

        if (sub === 'roll') {
            const results = [
                command.options.getInteger('one') || roll('d20'),
                command.options.getInteger('two') || roll('d20'),
            ];
            if (command.options.getBoolean('greater')) {
                results.push(command.options.getInteger('three') || roll('d20'));
            }
            await db.set(key, results);
            await command.reply(results.join(', '));
            return;
        }

        const used = command.options.getInteger('dice', true);
        const index = dice.indexOf(used);
        if (index === -1) {
            throw new FriendlyError(`No portent dice for ${used}. Available: ${dice.join(', ')}`);
        }
        dice.splice(index, 1);
        await db.set(key, dice);

        await command.reply(`Remaining: ${dice.join(', ')}`);
    },
};

export default portent;
