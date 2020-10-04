/* eslint-disable global-require */
const vehicleTypeController = require('../controllers/vehicleTypeController');

jest.mock('../dbConnection', () => {
  const VehicleType = {
    find: async () => [],
    findOne: async () => ({}),
  };

  return { VehicleType };
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const res = mockResponse();

describe('vehicleType Controller', () => {
  it('getAll', async () => {
    await vehicleTypeController.getAll({}, res);
    expect(res.status).toBeCalledWith(200);
  });
  it('findByType', async () => {
    const req = {
      params: {
        typeText: 'type',
      },
    };
    await vehicleTypeController.findByType(req, res);
    expect(res.status).toBeCalledWith(200);
  });
});
