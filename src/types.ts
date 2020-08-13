import { Collection, Message } from 'discord.js';

type ArgsOutput = (string | number)[];
export interface Arguments {
    /** Non-option arguments */
    _: ArgsOutput;
    /** Arguments after the end-of-options flag `--` */
    '--'?: ArgsOutput;
    /** All remaining options */
    [argName: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface Command {
    name: string;
    description: string;
    alias?: string[];
    usage?: string;
    examples?: string[];
    run(message: Message, args: Arguments, commands: Collection<string, Command>): Promise<Message | void>;
}
