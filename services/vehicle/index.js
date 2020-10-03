/* eslint-disable no-underscore-dangle */
require('regenerator-runtime/runtime');
require('core-js/stable');
const axios = require('axios');

// Express
const express = require('express');

const app = express();

app.use(express.json());

const VehicleModel = require('./dbConnection');

app.get('/vehicles', async (req, res) => {
  res.status(200).json(await VehicleModel.find());
});

app.post('/vehicles', async (req, res) => {
  let response;
  try {
    response = await axios.get(`http://localhost:${process.env.VEHICLE_TYPE_PORT}/vehicleTypes/${req.body.vehicleType}`);
  } catch (error) {
    res.status(400).send(error);
  }

  const newVehicle = {
    licensePlate: req.body.licensePlate,
    vehicleType: response.data._id,
  };

  const vehicle = new VehicleModel(newVehicle);

  try {
    await vehicle.save();
  } catch (error) {
    res.status(400).send(error);
  }
  res.status(201).send();
});

const server = app.listen(3000, () => {
  console.log('Vehicles service up and running');
});
module.exports = server;
