const mongoose = require('mongoose');
const vehicleTypeSchema = require('./vehicleTypeSchema');

const dbConnectionInfo = {
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
};

const connection = mongoose.createConnection(`mongodb+srv://${dbConnectionInfo.user}:${dbConnectionInfo.password}@cluster0.awfq1.mongodb.net/myapp`, () => {
  console.log('Connected to VehicleType DB');
});

const VehicleType = connection.model('Vehicle', vehicleTypeSchema);

module.exports = VehicleType;
