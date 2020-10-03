/* eslint-disable global-require */
const request = require('supertest');
const server = require('./index');

jest.mock('./dbConnection.js', () => {
  const mongoose = require('mongoose');
  const vehicleTypeSchema = require('./vehicleTypeSchema');

  const dbConnectionInfo = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  };

  const connection = mongoose.createConnection(`mongodb+srv://${dbConnectionInfo.user}:${dbConnectionInfo.password}@cluster0.awfq1.mongodb.net/myapp`, () => {
    console.log('Connected to VehicleType Test DB');
  });

  const VehicleType = connection.model('VehicleTypeTest', vehicleTypeSchema);
  return VehicleType;
});

describe('loading vehicleType service', () => {
  afterEach(() => {
    server.close();
  });
  it('responds to /vehicleTypes', (done) => {
    request(server).get('/vehicleTypes').expect(200, done);
  });
});
