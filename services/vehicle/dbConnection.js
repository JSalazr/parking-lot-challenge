const mongoose = require('mongoose');
const vehicleSchema = require('./schemas/vehicleSchema');
const vehicleTypeSchema = require('./schemas/vehicleTypeSchema');

const dbConnectionInfo = {
  connectionString: process.env.MONGO_CONNECTION_STRING,
  model: process.env.MONGO_VEHICLE,
};

const connection = mongoose.createConnection(
  `${dbConnectionInfo.connectionString}/${dbConnectionInfo.model}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to vehicle DB');
  },
);

const Vehicle = connection.model('Vehicle', vehicleSchema);
const VehicleType = connection.model('VehicleType', vehicleTypeSchema);

module.exports = { Vehicle, VehicleType };
