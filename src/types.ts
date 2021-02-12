import { Message, MessageReaction } from 'discord.js';

export interface Dictionary<T> {
    [key: string]: T;
}

export interface Command {
    name: string;
    description: string;
    alias?: string[];
    args?: RegExp;
    usage?: string;
    examples?: string[];
    run(message: Message, context: Context): Promise<Message | Message[] | MessageReaction | void>;
}

export interface Context {
    command: string;
    args: string[];
    match: string[];
    groups: Dictionary<string>;
}
