// Load express
const express = require("express");
const app = express();

app.use(express.json());

app.get("/vehicles", (req, res) => {
  res.sendStatus(200);
})

app.listen(3000, () => {
  console.log("Vehicles service up and running");
})