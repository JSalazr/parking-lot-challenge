require("regenerator-runtime/runtime");
require("core-js/stable");

const express = require("express");
const app = express();

app.use(express.json());

app.get("/vehicles", (req, res) => {
  res.sendStatus(200);
})

const server = app.listen(3000, () => {
  console.log("Vehicles service up and running");
});
module.exports = server;