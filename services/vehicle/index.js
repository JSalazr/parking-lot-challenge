require('regenerator-runtime/runtime');
require('core-js/stable');

// Express
const express = require('express');

const app = express();

app.use(express.json());

// Mongoose
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.awfq1.mongodb.net/${process.env.MONGO_VEHICLE}?retryWrites=true&w=majority`, () => {
  console.log('Connected to Vehicle DB');
});

app.get('/vehicles', (req, res) => {
  res.sendStatus(200);
});

const server = app.listen(3000, () => {
  console.log('Vehicles service up and running');
});
module.exports = server;
