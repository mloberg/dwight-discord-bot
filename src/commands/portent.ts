import { CommandBuilder, rollOption } from '../command';
import database from '../database';
import { FriendlyError } from '../error';
import { roll } from '../utils';

export default new CommandBuilder(async (command) => {
    const sub = command.options.getSubcommand();
    const key = `${command.guild?.id}-${command.user.id}`;
    const dice: number[] = (await database.get(key)) || [];

    if (sub === 'show') {
        await command.reply(dice.length > 0 ? dice.join(', ') : 'No available portent dice.');
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
        await database.set(key, results);
        await command.reply(results.join(', '));
        return;
    }

    const used = command.options.getInteger('dice', true);
    const index = dice.indexOf(used);
    if (index === -1) {
        throw new FriendlyError(`No portent dice for ${used}. Available: ${dice.join(', ')}`);
    }
    dice.splice(index, 1);
    await database.set(key, dice);

    await command.reply(`Remaining: ${dice.join(', ')}`);
})
    .setName('portent')
    .setDescription('Manage portent dice for a Divination Wizard')
    .addSubcommand((opt) => opt.setName('show').setDescription('Show available portent dice'))
    .addSubcommand((opt) =>
        opt
            .setName('roll')
            .setDescription('Roll new portent dice')
            .addBooleanOption((opt) => opt.setName('greater').setDescription('Roll three dice instead of two'))
            .addIntegerOption(rollOption('d20').setName('one'))
            .addIntegerOption(rollOption('d20').setName('two'))
            .addIntegerOption(rollOption('d20').setName('three')),
    )
    .addSubcommand((opt) =>
        opt
            .setName('use')
            .setDescription('Use a portent die')
            .addIntegerOption(rollOption('d20').setName('dice').setRequired(true)),
    ) as CommandBuilder;
