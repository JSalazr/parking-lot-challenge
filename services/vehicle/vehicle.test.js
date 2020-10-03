const request = require('supertest');
const server = require('./index');

jest.mock('./DbConnectionInfo.js', () => ({
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  model: process.env.MONGO_VEHICLE_TEST,
}));

describe('loading vehicle service', () => {
  afterEach(() => {
    server.close();
  });
  it('responds to /vehicles', (done) => {
    request(server).get('/vehicles').expect(200, done);
  });
});
