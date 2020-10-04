/* eslint-disable global-require */
const request = require('supertest');
const server = require('../index');

jest.mock('../dbConnection.js', () => {
  const mongoose = require('mongoose');
  const vehicleSchema = require('../schemas/vehicleSchema');
  const vehicleTypeSchema = require('../schemas/vehicleTypeSchema');

  const dbConnectionInfo = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    model: process.env.MONGO_VEHICLE_TEST,
  };

  const connection = mongoose.createConnection(`mongodb+srv://${dbConnectionInfo.user}:${dbConnectionInfo.password}@cluster0.awfq1.mongodb.net/${dbConnectionInfo.model}`, () => {
    console.log('Connected to vehicle DB');
  });

  const Vehicle = connection.model('Vehicle', vehicleSchema);
  const VehicleType = connection.model('VehicleType', vehicleTypeSchema);

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
      licensePlate: 'licensePlate',
    }).expect(201, done);
  });
  it('put /vehicles/:licensePlate/:vehicleType', (done) => {
    request(server).put('/vehicles/licensePlate/official').expect(200, done);
  });
});
