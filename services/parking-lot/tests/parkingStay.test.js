/* eslint-disable global-require */
const request = require('supertest');
const server = require('../index');

jest.mock('../dbConnection.js', () => {
  const mongoose = require('mongoose');
  const parkingStaySchema = require('../schemas/parkingStaySchema');

  const dbConnectionInfo = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    model: process.env.MONGO_PARKING_LOT_TEST,
  };

  const connection = mongoose.createConnection(`mongodb+srv://${dbConnectionInfo.user}:${dbConnectionInfo.password}@cluster0.awfq1.mongodb.net/${dbConnectionInfo.model}`, () => {
    console.log('Connected to parkingLotTest DB');
  });

  const ParkingStay = connection.model('ParkingStay', parkingStaySchema);

  return ParkingStay;
});

describe('loading parkingLot service', () => {
  afterEach(() => {
    server.close();
  });
  it('get /parkingStays', (done) => {
    request(server).get('/parkingStays').expect(200, done);
  });
});
