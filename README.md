# Dwight - Assistant to the Dungeon Master

Dwight is a Discord bot to help dungeon masters with their 5e games.

## Requirements

* NodeJS (>=12)

## Setup

You'll need to create a Discord bot. Follow the instructions over at
[discordjs.guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).

Once you have that, copy `.env.dist` to `.env` and set the `BOT_TOKEN` value to
the token you created above.

Once that's done run `npm install`, `npm run build`, and `npm start`.

## Development

To rebuild and restart the bot on file changes, run `npm run watch`.

## Contributing

Make sure tests (`npm run test`) and lint (`npm run lint`) pass before submitting
a Pull Request.
