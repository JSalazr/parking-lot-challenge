require('regenerator-runtime/runtime');
require('core-js/stable');

// Express
const express = require('express');

const app = express();

app.use(express.json());

const Vehicle = require('./dbConnection');

app.get('/vehicles', async (req, res) => {
  res.status(200).json(await Vehicle.find());
});

const server = app.listen(3000, () => {
  console.log('Vehicles service up and running');
});
module.exports = server;
