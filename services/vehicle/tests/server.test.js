/* eslint-disable global-require */
const request = require('supertest');
const server = require('../index');

jest.mock('../controllers/vehicleController.js', () => {
  require('regenerator-runtime/runtime');
  require('core-js/stable');
  const vehicleController = {
    getAll: async (req, res) => {
      res.status(200).json([]);
    },
    findOne: async (req, res) => {
      res.status(200).json({});
    },
    createVehicle: async (req, res) => {
      res.status(201).send();
    },
    setVehicleType: async (req, res) => {
      res.status(200).send();
    },
  };

  return vehicleController;
});

jest.mock('../controllers/vehicleTypeController.js', () => {
  require('regenerator-runtime/runtime');
  require('core-js/stable');
  const vehicleTypeController = {
    getAll: async (req, res) => {
      res.status(200).send([]);
    },
    findByType: async (req, res) => {
      res.status(200).send({});
    },
    createVehicleType: async (req, res) => {
      res.status(201).send();
    },
  };

  return vehicleTypeController;
});

describe('vehicle service', () => {
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
  it('get /vehicleTypes', (done) => {
    request(server).get('/vehicleTypes').expect(200).expect([], done);
  });
  it('get /vehicleTypes/:typeText', (done) => {
    request(server).get('/vehicleTypes/Official').expect(200, done);
  });
  it('post /vehicleTypes', (done) => {
    request(server).post('/vehicleTypes').send({
      type: 'testType',
    }).expect(201, done);
  });
});
