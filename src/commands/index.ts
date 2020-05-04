import { Collection } from "discord.js";

import Command from "../command";
import Fog from "./fog";
import Ping from "./ping";
import Prune from "./prune";

const ping = new Ping(null);
const prune = new Prune(null);
const fog = new Fog(null);

const commands = new Collection<string, Command>();
commands.set(ping.name, ping);
commands.set(prune.name, prune);
commands.set(fog.name, fog);

export default commands;
