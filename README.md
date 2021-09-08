# Dwight - Assistant to the Dungeon Master

Dwight is a Discord bot to help dungeon masters with their 5e games.

## Overview

* `/35` - Convert 3.5 skills to 5e
* `/elixir` - Return a random experimental elixir for Artificers
* `/event` - Return a random event
* `/illusions` - Manage a Deck of Illusions
* `/item` - Return a random magical item
* `/madness` - Roll on the madness table and send it to a user
* `/many` - The Deck of Many Things
* `/portent` - Manage portent dice for a Divination Wizard
* `/spell` - Return a random spell
* `/table` - Roll on the magic item tables
* `/treasure` - Generate random treasure from the treasure tables
* `/tricks` - Pull from a Bag of Tricks
* `/wildmagic` - Roll on the wild magic table

## Running

To run Dwight, you'll first need to create a Discord bot. Follow the instructions
over at [discordjs.guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
to get started.

Once you have a bot created, you can run Dwight via [Docker](#docker) (recommended)
or [manually](#manually).

### Docker

The easiest way to run Dwight is via Docker. We host images on
[GitHub Container Registry](https://github.com/users/mloberg/packages/container/package/dwight-bot).

First you need to register the application commands. You can either do this globally,
which can take a couple hours to propegate or for a single guild which is instant.

    docker run -e BOT_TOKEN=your-bot-token -e CLIENT_ID=your-client-id ghcr.io/mloberg/dwight-bot [guild]

Once installed, run the app.

    docker run -e BOT_TOKEN=your-bot-token ghcr.io/mloberg/dwight-bot

### Manually

To run Dwight without Docker, you'll need NodeJS 16.

First run `npm install` and `npm run build`.

Then install the commands.

    BOT_TOKEN=your-bot-token CLIENT_ID=your-client-id GUILD_ID=your-guild-id node dist/bin/install.js

Then run the bot.

    BOT_TOKEN=your-bot-token npm start

## Data

Some commands save data (like _portent_). By default this is in-memory, but you
can either save it to Redis or to disk as a JSON file. To save in redis, pass
(or set) `DB_URL` to `redis://user:pass@localhost:6379`. To save to disk set
`file:./path/to/file.json`.

    docker run -e BOT_TOKEN=your-bot-token -e DB_URL=file:.data/store.json -v $PWD/.data:/app.data ghcr.io/mloberg/dwight-bot

## Development

Copy `.env.dist` to `.env` and fill in the values. Rebuild and restart the bot
on file changes with `npm run dev`.

## Contributing

Make sure tests (`npm test`) and lint (`npm run lint`) pass before submitting a
Pull Request.
