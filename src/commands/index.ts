import { Collection } from 'discord.js';
import fs from 'fs';

import logger from '../logger';
import { SlashCommand } from '../types';

const commands = new Collection<string, SlashCommand>();

const files = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith('.js'))
    .filter((file) => file !== 'index.js');

for (const file of files) {
    logger.debug({ file }, 'loading command');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command: SlashCommand = require(`./${file}`).default;
    commands.set(command.config.name, command);
}

export default commands;
