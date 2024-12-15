const express = require("express");
const auth = express.Router();
const connection = require("../Modules/mysql");

auth.use(express.urlencoded({ extended: true }));

auth.post("/auth", (req, res) => {
  const ip = req.ip.replace("::ffff:", "");
  const { product } = req.headers;

  if (!product) return res.status(404).send({ err: "ProductId not found" });
  if (!ip) return res.status(404).send({ err: "IP not found" });

  connection.query(
    "SELECT * FROM licenses WHERE product = ? AND ip = ? OR devip = ?",
    [product, ip, ip],
    (err, rows) => {
      if (err) {
        return console.log(err.message);
      }
      if (rows.length === 0) {
        console.log(`not authed >> ${ip} / ${product}`);
        return res.status(401).send({ msg: "not authed", status: false });
      } else if (rows.length === 1) {
        console.log(`authed >> ${ip} / ${product}`);
        return res.status(401).send({ msg: "Authorized", status: true });
      }
    }
  );
});

module.exports = auth;
