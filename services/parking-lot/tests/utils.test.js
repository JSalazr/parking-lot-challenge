/* eslint-disable global-require */
const { updateResidentTime, findLatestStay, findVehicle } = require('../utils');

const ParkingStay = {
  find: async () => [],
  findOne: () => ({
    sort: async () => ({ _id: 0 }),
  }),
  updateOne: async () => ({}),
};

const ResidentTime = {
  find: async () => [],
  findOne: async () => ({ time: 0 }),
  update: async () => ({}),
};

describe('utils', () => {
  it('updateResidentTime', async () => {
    const licensePlate = 'plate';
    const timeToAdd = 50;
    const response = await updateResidentTime(ResidentTime, licensePlate, timeToAdd);
    expect(response.status).toBe(200);
  });

  it('findLatestStay', async () => {
    const licensePlate = 'plate';
    const stay = await findLatestStay(ParkingStay, licensePlate);
    expect(stay._id).toBe(0);
  });

  it('findVehicle', async () => {
    const licensePlate = 'plate';
    const vehicle = await findVehicle(licensePlate);
    expect(vehicle.status).toBe(400);
  });
});
