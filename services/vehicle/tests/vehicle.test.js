/* eslint-disable global-require */
const request = require('supertest');
const server = require('../index');

jest.mock('../dbConnection.js', () => {
  const mongoose = require('mongoose');
  const vehicleSchema = require('../schemas/vehicleSchema');

  const dbConnectionInfo = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    model: process.env.MONGO_VEHICLE_TEST,
  };

  const connection = mongoose.createConnection(`mongodb+srv://${dbConnectionInfo.user}:${dbConnectionInfo.password}@cluster0.awfq1.mongodb.net/${dbConnectionInfo.model}`, () => {
    console.log('Connected to Vehicle DB');
  });

  const Vehicle = connection.model('VehicleTest', vehicleSchema);
  const VehicleType = connection.model('VehicleTypeTest', vehicleSchema);

  return { Vehicle, VehicleType };
});

describe('loading vehicle service', () => {
  afterEach(() => {
    server.close();
  });
  it('get /vehicles', (done) => {
    request(server).get('/vehicles').expect(200, done);
  });
  it('post /vehicles', (done) => {
    request(server).post('/vehicles').send({
      licensePlate: 'test licencePlate',
    }).expect(201, done);
  });
});
