const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents, loadCommands } = require("./src/handlers");

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember, Channel],
});
client.commands = new Collection();

client.login(require("./src/Configs/main.json").token).then(() => {
  client.commands = new Collection();
  loadEvents(client);
  console.clear();
});
