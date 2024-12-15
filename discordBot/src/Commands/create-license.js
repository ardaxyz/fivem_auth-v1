const { SlashCommandBuilder } = require("discord.js");
const connection = require("../Modules/mysql");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-license")
    .setDescription("Create a License for a Product")
    .addStringOption((option) =>
      option
        .setName("product")
        .setDescription("Put the ProductName")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("discordid")
        .setDescription("Choice a User")
        .setRequired(true)
    ),
  async execute(interaction) {
    const product = interaction.options.getString("product");
    const discordId = interaction.options.getUser("discordid");
    connection.query(
      "SELECT * FROM licenses WHERE product = ? AND discordid = ?",
      [product, discordId.id],
      (err, rows) => {
        if (err) {
          return console.log(err.message);
        }
        if (rows.length === 1) {
          return interaction.reply({
            content: "Der User hat bereits eine Lizenz zu dem Produkt.",
            ephemeral: true,
          });
        } else if (rows.length === 0) {
          discordId.send({
            content: `Eine Lizenz für das Produkt ${product} wurde für sie erstellt.`,
          });
          return interaction.reply({
            content: `Lizenz für das Produkt ${product} wurde erfolgreich erstellt.`,
            ephemeral: true,
          });
        }
      }
    );
  },
};
