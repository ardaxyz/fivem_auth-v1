const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      try {
        command.execute(interaction, client);
      } catch (error) {
        interaction.reply({
          content: "Beim ausführen des Commands ist ein Fehler aufgetreten!",
          ephemeral: true,
        });
      }
    }
  },
};
