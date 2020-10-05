const mongoose = require('mongoose');
const parkingStaySchema = require('./schemas/parkingStaySchema');
const residentTimeSchema = require('./schemas/residentTimeSchema');

const dbConnectionInfo = {
  connectionString: process.env.MONGO_CONNECTION_STRING,
  model: process.env.MONGO_PARKING_LOT,
};

const connection = mongoose.createConnection(
  `${dbConnectionInfo.connectionString}/${dbConnectionInfo.model}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to parkingLot DB');
  },
);

const ParkingStay = connection.model('ParkingStay', parkingStaySchema);
const ResidentTime = connection.model('ResidentTime', residentTimeSchema);

module.exports = { ParkingStay, ResidentTime };
