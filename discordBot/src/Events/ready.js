const config = require("../Configs/main.json");
const { log } = require("../Modules/log");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setPresence({
      activities: [{ name: config.Activity.name, type: config.Activity.type }],
      status: config.Activity.status,
    });
    log(`The Bot is Successfully Online!`, "success", "Discord.Js");
  },
};
