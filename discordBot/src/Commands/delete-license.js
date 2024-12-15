const { SlashCommandBuilder } = require("discord.js");
const connection = require("../Modules/mysql");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete-license")
    .setDescription("Delete a License for a Product")
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
          connection.query(
            "DELETE FROM licenses WHERE product = ? AND discordId = ?",
            [product, discordId.id],
            (err, rows) => {
              if (err) {
                return console.log(err.message);
              }
              return interaction.reply({
                content: `Die Lizenz von ${discordId} wured erfolgreich gelöscht!`,
                ephemeral: true,
              });
            }
          );
        } else if (rows.length === 0) {
          return interaction.reply({
            content: `Der User besitzt keine license für das Produkt >> \`\`${product}\`\``,
            ephemeral: true,
          });
        }
      }
    );
  },
};
