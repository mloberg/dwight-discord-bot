import { Collection } from "discord.js";

import Command from "../command";
import Fog from "./fog";
import Ping from "./ping";
import Prune from "./prune";
import Treasure from "./treasure";

const ping = new Ping(null);
const prune = new Prune(null);
const fog = new Fog(null);
const treasure = new Treasure(null);

const commands = new Collection<string, Command>();
commands.set(ping.name, ping);
commands.set(prune.name, prune);
commands.set(fog.name, fog);
commands.set(treasure.name, treasure);

export default commands;
