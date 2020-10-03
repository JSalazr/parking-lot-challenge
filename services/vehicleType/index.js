require('regenerator-runtime/runtime');
require('core-js/stable');

// Express
const express = require('express');

const app = express();

app.use(express.json());

const VehicleType = require('./dbConnection');

app.get('/vehicleTypes', async (req, res) => {
  res.status(200).json(await VehicleType.find());
});

const server = app.listen(3001, () => {
  console.log('VehicleTypes service up and running');
});
module.exports = server;
