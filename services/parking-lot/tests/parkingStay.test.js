/* eslint-disable global-require */
const request = require('supertest');
const server = require('../index');

jest.mock('../controllers/parkingStayController.js', () => {
  require('regenerator-runtime/runtime');
  require('core-js/stable');
  const parkingStayController = {
    getAllActive: async (req, res) => {
      res.status(200).json([]);
    },
    registerEntrance: async (req, res) => {
      res.status(201).send();
    },
    registerExit: async (req, res) => {
      res.status(200).send({ amountToPay: 0 });
    },
  };

  return parkingStayController;
});

describe('loading parkingLot service', () => {
  afterEach(() => {
    server.close();
  });
  it('get /parkingStays', (done) => {
    request(server).get('/parkingStays').expect(200, done);
  });
  it('post /parkingStays/entrance', (done) => {
    request(server)
      .post('/parkingStays/entrance')
      .send({ licensePlate: 'licensePlate' })
      .expect(201, done);
  });
  it('put /parkingStays/exit', (done) => {
    request(server)
      .put('/parkingStays/exit')
      .send({ licensePlate: 'licensePlate' })
      .expect(200, done);
  });
});
