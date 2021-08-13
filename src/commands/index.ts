import { Collection } from 'discord.js';
import fs from 'fs';

import { SlashCommand } from '../types';

const commands = new Collection<string, SlashCommand>();

const files = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith('.js'))
    .filter((file) => file !== 'index.js');

for (const file of files) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`./${file}`).default;
    commands.set(command.name, command);
}

export default commands;
