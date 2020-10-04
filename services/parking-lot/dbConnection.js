const mongoose = require('mongoose');
const parkingStaySchema = require('./schemas/parkingStaySchema');
const residentTimeSchema = require('./schemas/residentTimeSchema');

const dbConnectionInfo = {
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  model: process.env.MONGO_PARKING_LOT,
};

const connection = mongoose.createConnection(
  `mongodb+srv://${dbConnectionInfo.user}:${dbConnectionInfo.password}@cluster0.awfq1.mongodb.net/${dbConnectionInfo.model}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to parkingLot DB');
  },
);

const ParkingStay = connection.model('ParkingStay', parkingStaySchema);
const ResidentTime = connection.model('ResidentTime', residentTimeSchema);

module.exports = { ParkingStay, ResidentTime };
