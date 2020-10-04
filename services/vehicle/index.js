/* eslint-disable no-underscore-dangle */
require('regenerator-runtime/runtime');
require('core-js/stable');

// Express
const express = require('express');

const app = express();

app.use(express.json());

const vehicleController = require('./controllers/vehicleController');
const vehicleTypeController = require('./controllers/vehicleTypeController');

app.get('/vehicles', vehicleController.getAll);

app.post('/vehicles', vehicleController.createVehicle);

app.get('/vehicleTypes', vehicleTypeController.getAll);

app.get('/vehicleTypes/:typeText', vehicleTypeController.findByType);

app.post('/vehicleTypes', vehicleTypeController.createVehicleType);

const server = app.listen(3000, () => {
  console.log('Vehicles service up and running');
});
module.exports = server;
