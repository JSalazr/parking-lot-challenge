/* eslint-disable global-require */
const parkingStayController = require('../controllers/parkingStayController');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.attachment = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('../dbConnection', () => {
  const ParkingStay = {
    find: async () => [],
    findOne: () => ({
      populate: async () => ({ _id: 0 }),
    }),
    updateOne: async () => ({}),
    updateMany: async () => {},
  };

  const ResidentTime = {
    find: async () => [],
    findOne: async () => ({ _id: 0 }),
    deleteMany: async () => {},
  };

  return { ParkingStay, ResidentTime };
});

jest.mock('../utils', () => {
  const updateResidentTime = async () => ({
    status: 200,
  });

  const findLatestStay = async () => ({
    _id: '123123',
    entranceDate: '2020-10-04T17:23:31.903+00:00',
  });

  const findVehicle = async () => ({
    licensePlate: 'plate',
    vehicleType: {
      type: 'Official',
    },
  });
  return { updateResidentTime, findLatestStay, findVehicle };
});

const res = mockResponse();

describe('vehicle Controller', () => {
  it('getAllActive', async () => {
    await parkingStayController.getAllActive({}, res);
    expect(res.status).toBeCalledWith(200);
  });
  it('registerExit', async () => {
    const req = {
      body: {
        licensePlate: 'plate',
      },
    };
    await parkingStayController.registerExit(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  it('startNewMonth', async () => {
    await parkingStayController.startNewMonth({}, res);
    expect(res.status).toBeCalledWith(200);
  });
  it('generateReport', async () => {
    await parkingStayController.generateReport({}, res);
    expect(res.status).toBeCalledWith(200);
  });
});
