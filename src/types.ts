/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client, Message } from 'discord.js';

type ArgsOutput = (string | number)[];
export interface Arguments {
    /** Non-option arguments */
    _: ArgsOutput;
    /** Arguments after the end-of-options flag `--` */
    '--'?: ArgsOutput;
    /** All remaining options */
    [argName: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface CommandOptions {
    name: string;
    description: string;
}

export class Command {
    public readonly name: string;
    public readonly description: string;
    constructor(client: Client, options: CommandOptions) {
        this.name = options.name;
        this.description = options.description;
    }

    async run(message: Message, args: Arguments): Promise<Message | void> {
        throw new Error('Missing command logic');
    }
}
