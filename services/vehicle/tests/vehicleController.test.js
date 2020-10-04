/* eslint-disable global-require */
const vehicleController = require('../controllers/vehicleController');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('../dbConnection', () => {
  const Vehicle = {
    find: () => ({
      populate: async () => [],
    }),
    findOne: () => ({
      populate: async () => ({ _id: 0 }),
    }),
    updateOne: async () => ({}),
  };

  const VehicleType = {
    find: async () => [],
    findOne: async () => ({ _id: 0 }),
  };

  return { Vehicle, VehicleType };
});

const res = mockResponse();

describe('vehicle Controller', () => {
  it('getAll', async () => {
    await vehicleController.getAll({}, res);
    expect(res.status).toBeCalledWith(200);
  });
  it('findOne', async () => {
    const req = {
      params: {
        licensePlate: 'plate',
      },
    };
    await vehicleController.findOne(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  it('setVehicleType', async () => {
    const req = {
      params: {
        vehicleType: 'Official',
        licensePlate: 'plate',
      },
    };
    await vehicleController.setVehicleType(req, res);
    expect(res.status).toBeCalledWith(200);
  });
});
