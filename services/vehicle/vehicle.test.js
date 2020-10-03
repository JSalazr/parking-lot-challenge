/* eslint-disable global-require */
const request = require('supertest');
const server = require('./index');

jest.mock('./dbConnection.js', () => {
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

  return Vehicle;
});

describe('loading vehicle service', () => {
  afterEach(() => {
    server.close();
  });
  it('responds to /vehicles', (done) => {
    request(server).get('/vehicles').expect(200, done);
  });
});
