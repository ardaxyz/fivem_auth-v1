const mysql = require("mysql");
const config = require("../../config.json");
const connection = mysql.createConnection({
  host: config.mysql.host || "127.00.01",
  user: config.mysql.user || "root",
  password: config.mysql.password || undefined,
  database: config.mysql.database || undefined,
});

connection.connect((err) => {
  if (err) {
    return console.log(err.message);
  }
});

module.exports = connection;
