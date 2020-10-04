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
  const Vehicle = () => {};
  Vehicle.find = () => ({
    populate: async () => [],
  });
  Vehicle.findOne = () => ({
    populate: async () => ({ _id: 0 }),
  });
  Vehicle.updateOne = () => ({
    populate: async () => {},
  });
  Vehicle.prototype.save = async () => {};

  const VehicleType = () => {};
  VehicleType.find = async () => [];
  VehicleType.findOne = async () => ({});
  VehicleType.prototype.save = async () => {};

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
  it('createVehicle', async () => {
    const req = {
      body: {
        licensePlate: 'licensePlate',
      },
    };
    await vehicleController.createVehicle(req, res);
    expect(res.status).toBeCalledWith(201);
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
