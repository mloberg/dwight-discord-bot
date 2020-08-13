import { Client, Message } from 'discord.js';

import { Arguments, Command } from '../types';
import { random } from '../utils';

const events: { event: string; where?: string[]; when?: string[] }[] = [
    {
        event: 'A door opens',
        where: ['inside', 'town', 'dungeon'],
    },
    {
        event: 'A fire starts',
    },
    {
        event: 'A meteor shoots across the sky',
        where: ['outside'],
        when: ['night'],
    },
    {
        event: 'A monster appears',
    },
    {
        event: 'A screech pierces the air',
    },
    {
        event: 'A storm begins',
        where: ['inside', 'outside', 'town'],
    },
    {
        event: 'A strange star appears in the sky',
        where: ['outside'],
        when: ['night'],
    },
    { event: 'A strong gust of wind blows through' },
    { event: 'A tremor shakes the ground' },
    { event: 'Someone experiences déjà vu' },
    { event: 'Someone gets angry' },
    { event: 'Someone glimpses the future' },
    { event: 'Someone has a sense of foreboding' },
    { event: 'Someone has to go to the bathroom' },
    { event: 'Something spills or falls to the ground' },
    { event: "Something isn't where it's supposed to be" },
    { event: 'The lights go out' },
    { event: 'The sun comes out' },
    { event: "There's a foul smell in the air" },
    { event: 'Unexplained magic occurs' },
];

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'event',
            description: 'Trigger a random event',
        });
    }

    async run(message: Message, args: Arguments): Promise<Message> {
        const where = args.where || args._[0];
        const when = args.when || args._[1];

        let filtered = events;

        if (where) {
            filtered = filtered.filter((e) => !e.where || e.where.includes(where.toLowerCase()));
        }

        if (when) {
            filtered = filtered.filter((e) => !e.when || e.when.includes(when.toLowerCase()));
        }

        const event = random(filtered);

        await message.delete();

        return event ? message.channel.send(event.event) : null;
    }
}
