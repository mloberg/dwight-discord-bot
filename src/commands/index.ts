import { Collection } from 'discord.js';
import fs from 'fs';

import { CommandBuilder } from '../command';

const commands = new Collection<string, CommandBuilder>();

const files = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith('.js'))
    .filter((file) => file !== 'index.js');

for (const file of files) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command: CommandBuilder = require(`./${file}`).default;
    commands.set(command.name, command);
}

export default commands;
