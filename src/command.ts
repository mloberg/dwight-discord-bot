import { Message, MessageReaction } from 'discord.js';
import { Dictionary } from 'lodash';

export interface Context {
    command: string;
    args: string[];
    match: string[];
    groups: Dictionary<string>;
}

export type HandlerFunc = (message: Message, context: Context) => Promise<Message | Message[] | MessageReaction | void>;

type Config = {
    name: string;
    run: HandlerFunc;
    description: string;
    alias?: string[];
    args?: RegExp;
    usage?: string;
    examples?: string[];
};

export default class Command {
    name: string;
    alias: string[];
    description: string;
    usage: string;
    examples: string[];

    args: RegExp;
    run: HandlerFunc;

    constructor({ name, description, run, alias = [], args = /.*/, usage = '', examples = [] }: Config) {
        this.name = name;
        this.run = run;
        this.description = description;
        this.alias = alias;
        this.args = args;
        this.usage = usage;
        this.examples = examples;
    }

    help(prefix: string): string {
        const help = [`**${this.name}**: ${this.description}`];

        if (this.alias.length) {
            help.push(`*aliases*: ${this.alias.join(', ')}`);
        }

        if (this.usage) {
            help.push(`*usage*: \`${prefix}${this.name} ${this.usage}\``);
        }

        if (this.examples.length) {
            help.push(`*examples*: ${this.examples.map((e) => `\`${prefix}${this.name} ${e}\``).join(', ')}`);
        }

        return help.join('\n');
    }
}

export class Manager {
    private commands: Command[] = [];

    register(command: Command): void {
        this.commands.push(command);
    }

    get(name: string): Command | undefined {
        return this.commands.find((c) => c.name === name || c.alias.includes(name));
    }

    list(): string[] {
        return this.commands.map((c) => c.name);
    }

    all(): string[] {
        return this.commands.flatMap((c) => [c.name, ...c.alias]);
    }
}
