require('regenerator-runtime/runtime');
require('core-js/stable');

// Express
const express = require('express');

const app = express();

app.use(express.json());

const VehicleTypeModel = require('./dbConnection');

app.get('/vehicleTypes', async (req, res) => {
  res.status(200).json(await VehicleTypeModel.find());
});

app.post('/vehicleTypes', async (req, res) => {
  const newVehicleType = {
    type: req.body.type,
  };

  const vehicleType = new VehicleTypeModel(newVehicleType);

  try {
    await vehicleType.save();
  } catch (error) {
    console.log(error);
  }
  res.status(201).send();
});

const server = app.listen(3001, () => {
  console.log('VehicleTypes service up and running');
});
module.exports = server;
