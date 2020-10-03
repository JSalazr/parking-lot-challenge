const request = require('supertest');
const server = require('./index');

describe('loading vehicle service', () => {
  afterEach(() => {
    server.close();
  });
  it('responds to /vehicles', (done) => {
    request(server).get('/vehicles').expect(200, done);
  });
});
