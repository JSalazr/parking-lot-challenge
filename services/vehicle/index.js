require('regenerator-runtime/runtime');
require('core-js/stable');

// Express
const express = require('express');

const app = express();

app.use(express.json());

const VehicleModel = require('./dbConnection');

app.get('/vehicles', async (req, res) => {
  res.status(200).json(await VehicleModel.find());
});

app.post('/vehicles', async (req, res) => {
  const newVehicle = {
    license: req.body.license,
    type: req.body.type,
  };

  const vehicleType = new VehicleModel(newVehicle);

  try {
    await vehicleType.save();
  } catch (error) {
    console.log(error);
  }
  res.status(201).send();
});

const server = app.listen(3000, () => {
  console.log('Vehicles service up and running');
});
module.exports = server;
