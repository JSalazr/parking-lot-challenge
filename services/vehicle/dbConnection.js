const mongoose = require('mongoose');
const vehicleSchema = require('./vehicleSchema');

const dbConnectionInfo = {
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
};

const connection = mongoose.createConnection(`mongodb+srv://${dbConnectionInfo.user}:${dbConnectionInfo.password}@cluster0.awfq1.mongodb.net/myapp`, () => {
  console.log('Connected to Vehicle DB');
});

const Vehicle = connection.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
