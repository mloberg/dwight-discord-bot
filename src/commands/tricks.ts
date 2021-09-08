import { CommandBuilder, rollOption } from '../command';
import { FriendlyError } from '../error';
import { roll } from '../utils';

const bags = {
    gray: ['Weasel', 'Giant rat', 'Badger', 'Boar', 'Panther', 'Giant badger', 'Dire wolf', 'Giant elk'],
    rust: ['Rat', 'Owl', 'Mastiff', 'Goat', 'Giant goat', 'Giant boar', 'Lion', 'Brown bear'],
    tan: ['Jackal', 'Ape', 'Baboon', 'Axe beak', 'Black bear', 'Giant weasel', 'Giant hyena', 'Tiger'],
};

export default new CommandBuilder(async (command) => {
    const color = command.options.getString('color', true) as keyof typeof bags;
    const dice = command.options.getInteger('roll') || roll('d8');
    const result = bags[color][dice - 1];

    if (!result) {
        throw new FriendlyError('Unable to pull from the Bag of Tricks.');
    }

    await command.reply(result);
})
    .setName('tricks')
    .setDescription('Pull from a Bag of Tricks')
    .addStringOption((option) =>
        option
            .setName('color')
            .setDescription('The color of the Bag of Tricks')
            .setRequired(true)
            .addChoice('Gray', 'gray')
            .addChoice('Rust', 'rust')
            .addChoice('Tan', 'tan'),
    )
    .addIntegerOption(rollOption('d8'));
