# Dwight - Assistant to the Dungeon Master

Dwight is a Discord bot to help dungeon masters with their 5e games.

## Commands

Here are the commands available from Dwight.

| Command                                   | Description |
|-------------------------------------------|-------------|
| `?help [command]`                         | List and get help with a commands |
| `?3.5 <skill>`                            | Convert 3.5 skills to 5e |
| `?elixir <d6>`                            | Craft an Alchemist experimental elixir |
| `?event`                                  | Trigger a random event |
| `?item [rarity] [type]`                   | Get a random magical item |
| `?madness [short\|long\|flaw] <...@user>` | Give a random madness to a user(s) |
| `?spell [level] [class] [school]`         | Get a random spell |
| `?table <table> [d100]`                   | Roll on the magic item tables |
| `?treasure [hoard] <cr> [d100]`           | Generate treasure for an encounter |
| `?wild magic [barbarian] [d100\|d8]`      | Roll on the wild magic table |
| `?portent <show\|roll\|use> [d20]`        | Manage portent dice for a Divination Wizard |

## Running

To run Dwight, you'll first need to create a Discord bot. Follow the instructions
over at [discordjs.guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
to get started.

Once you have a bot created, you can run Dwight via [Docker](#docker) or [manually](#manually).

### Docker

The easiest way to run Dwight is via Docker. We host images on
[GitHub Container Registry](https://github.com/users/mloberg/packages/container/package/dwight-bot).

    docker run -e BOT_TOKEN=your-bot-token ghcr.io/mloberg/dwight-bot

### Manually

To run Dwight without Docker, you'll need NodeJS 16.

Copy `.env.dist` to `.env` and set `BOT_TOKEN`.

Once that's done run `npm install`, `npm run build`, and `npm start`.

## Data

Some commands save data (like _portent_). By default this is in-memory, but you
can either save it to Redis or to disk as a JSON file. To save in redis, pass
(or set) `DB_URL` to `redis://user:pass@localhost:6379`. To save to disk set
`file:./path/to/file.json`.

    docker run -e BOT_TOKEN=your-bot-token -e DB_URL=file:.data/store.json -v $PWD/.data:/app.data ghcr.io/mloberg/dwight-bot

## Development

To rebuild and restart the bot on file changes, run `npm run watch`. To increase
logging, add `LOG_LEVEL=debug` to `.env`.

## Contributing

Make sure tests (`npm run test`) and lint (`npm run lint`) pass before submitting
a Pull Request.
