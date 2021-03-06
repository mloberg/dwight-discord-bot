import { sample } from 'lodash';

import Command from '../command';

export const events = [
    'A door opens',
    'A fire starts',
    'A meteor shoots across the sky',
    'A monster appears',
    'A screech pierces the air',
    'A storm begins',
    'A strange star appears in the sky',
    'A strong gust of wind blows through',
    'A tremor shakes the ground',
    'Someone experiences déjà vu',
    'Someone gets angry',
    'Someone glimpses the future',
    'Someone has a sense of foreboding',
    'Someone has to go to the bathroom',
    'Something spills or falls to the ground',
    "Something isn't where it's supposed to be",
    'The lights go out',
    'The sun comes out',
    "There's a foul smell in the air",
    'Unexplained magic occurs',
];

export default new Command({
    name: 'event',
    description: 'Trigger a random event',
    async run(message) {
        await message.delete();

        return message.channel.send(sample(events) ?? 'Something happens');
    },
});
