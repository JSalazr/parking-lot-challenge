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
  const ParkingStay = () => {};
  ParkingStay.find = async () => [];
  ParkingStay.findOne = () => ({
    populate: async () => ({ _id: 0 }),
  });
  ParkingStay.updateOne = async () => ({});
  ParkingStay.updateMany = async () => {};
  ParkingStay.prototype.save = async () => {};

  const ResidentTime = () => {};
  ResidentTime.find = async () => [];
  ResidentTime.findOne = async () => ({ _id: 0 });
  ResidentTime.deleteMany = async () => {};
  ResidentTime.prototype.save = async () => {};

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

  const getValuesForResidentReport = async () => [];
  return {
    updateResidentTime, findLatestStay, findVehicle, getValuesForResidentReport,
  };
});

const res = mockResponse();

describe('parkingStay Controller', () => {
  it('getAllActive', async () => {
    await parkingStayController.getAllActive({}, res);
    expect(res.status).toBeCalledWith(200);
  });
  it('registerEntrance', async () => {
    const req = {
      body: {
        licensePlate: 'licensePlate',
      },
    };
    await parkingStayController.registerEntrance(req, res);
    expect(res.status).toBeCalledWith(400);
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
