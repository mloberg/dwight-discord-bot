import { ArgumentType } from "discord.js-commando";

export default class FilterType extends ArgumentType {
    constructor(client) {
        super(client, "filter");
    }

    validate(val) {
        return val.indexOf(":");
    }

    parse(val: string) {
        return val.split(" ").map(v => v.split(":", 2));
    }
}

module.exports = FilterType;
