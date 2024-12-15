const fs = require("fs");
const path = require("path");
const AsciiTable = require("ascii-table");

function loadCommands(client) {
  const table = new AsciiTable().setHeading("Commands", "Status");
  let commandsArray = [];

  const commandFiles = fs
    .readdirSync(path.join(__dirname, "Commands"))
    .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

  for (const file of commandFiles) {
    const commandFile = require(path.join(__dirname, "Commands", file));

    if (commandFile.data) {
      const properties = { ...commandFile };
      client.commands.set(commandFile.data.name, properties);
      commandsArray.push(commandFile.data.toJSON());
      table.addRow(file, "Loaded");
    } else {
      console.error(`Command file "${file}" is missing the "data" property.`);
    }
  }

  client.application.commands.set(commandsArray);
  console.log(table.toString());
}

function loadEvents(client) {
  const table = new AsciiTable().setHeading("Events", "Status");

  const eventFiles = fs
    .readdirSync(path.join(__dirname, "Events"))
    .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

  for (const file of eventFiles) {
    const event = require(path.join(__dirname, "Events", file));

    if (event.rest) {
      if (event.once) {
        client.rest.once(event.name, (...args) =>
          event.execute(...args, client)
        );
      } else {
        client.rest.on(event.name, (...args) => event.execute(...args, client));
      }
    } else {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
    table.addRow(file, "Loaded");
  }

  console.log(table.toString());
}

module.exports = { loadCommands, loadEvents };
