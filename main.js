const { Client, IntentsBitField, Collection } = require("discord.js");
const { Player } = require("discord-player")
const client = new Client({intents: new IntentsBitField(3276799)});
const loadCommands = require("./loaders/loadCommands");
const loadEvents = require("./loaders/loadEvents");
require("dotenv").config();

client.commands = new Collection();
client.player = new Player(client, {
  ytdlOptions: {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }
});
client.player.extractors.loadDefault();

(async () => {
  loadCommands(client);
  loadEvents(client);
client.login(process.env.TOKEN);
})();