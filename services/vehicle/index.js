require('regenerator-runtime/runtime');
require('core-js/stable');

// Express
const express = require('express');

const app = express();

app.use(express.json());

// Mongoose
const mongoose = require('mongoose');
const dbConnectionInfo = require('./DbConnectionInfo');
require('./vehicleModel');

const Vehicle = mongoose.model('Vehicle');
mongoose.connect(`mongodb+srv://${dbConnectionInfo.user}:${dbConnectionInfo.password}@cluster0.awfq1.mongodb.net/${dbConnectionInfo.model}?retryWrites=true&w=majority`, () => {
  console.log('Connected to Vehicle DB');
});

app.get('/vehicles', async (req, res) => {
  res.status(200).json(await Vehicle.find());
});

const server = app.listen(3000, () => {
  console.log('Vehicles service up and running');
});
module.exports = server;
