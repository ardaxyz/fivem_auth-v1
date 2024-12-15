const express = require("express");
const app = express();
const auth = require("./Router/auth");
const config = require("../config.json");

app.use("/v1", auth);

app.listen(config.port, () => {
  console.clear();
  console.log("Express >> Server is running on port 3000");
});
