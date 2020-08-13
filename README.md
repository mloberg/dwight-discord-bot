# Dwight - Assistant to the Dungeon Master

Dwight is a Discord bot to help dungeon masters run their 5e games.

## Requirements

* NodeJS (>=12)

## Setup

You'll need to create a Discord bot. Follow the instructions over at [discordjs.guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).

Once you have that, copy `.env.dist` to `.env` and set the `BOT_TOKEN` value to
the token you created above.

Then run `npm install`. Finally run `npm start`.

## Development

To rebuild and restart the bot on file changes, run `npm run watch`.

## Contributing

Before commit changes, make sure `npm run lint` passes.
