const mongoose = require('mongoose');
const vehicleSchema = require('./schemas/vehicleSchema');
const vehicleTypeSchema = require('./schemas/vehicleTypeSchema');

const dbConnectionInfo = {
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  model: process.env.MONGO_VEHICLE,
};

const connection = mongoose.createConnection(`mongodb+srv://${dbConnectionInfo.user}:${dbConnectionInfo.password}@cluster0.awfq1.mongodb.net/${dbConnectionInfo.model}`, () => {
  console.log('Connected to vehicle DB');
});

const Vehicle = connection.model('Vehicle', vehicleSchema);
const VehicleType = connection.model('VehicleType', vehicleTypeSchema);

module.exports = { Vehicle, VehicleType };
