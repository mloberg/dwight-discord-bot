import { Client, Message } from "discord.js";
import { Arguments, Options } from "yargs-parser";

interface Config {
    name: string;
    description: string;
}

export default abstract class {
    public readonly name: string;
    constructor(client: Client, config: Config) {
        this.name = config.name;
    }

    usage(prefix: string): string {
        return `${prefix}${this.name}`;
    }

    get parserOptions(): Options {
        return {};
    }

    abstract run(message: Message, args: Arguments): void;
}
