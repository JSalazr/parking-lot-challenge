require('regenerator-runtime/runtime');
require('core-js/stable');
const axios = require('axios');

const updateResidentTime = async (ResidentTime, licensePlate, timeToAdd) => {
  let previousTime;
  try {
    previousTime = await ResidentTime.findOne({ licensePlate });
  } catch (error) {
    return { status: 400, error };
  }
  const newResidentTime = {
    licensePlate,
    time: previousTime ? previousTime.time + timeToAdd : timeToAdd,
  };
  try {
    await ResidentTime.updateOne({ licensePlate }, newResidentTime, { upsert: true });
  } catch (error) {
    return { status: 400, error };
  }

  return { status: 200 };
};

const findLatestStay = async (ParkingStay, licensePlate) => {
  let existingStay;
  try {
    existingStay = await ParkingStay.findOne({ licensePlate }).sort({ entranceDate: -1 });
  } catch (error) {
    return { status: 400, error };
  }
  return existingStay;
};

const findVehicle = async (licensePlate) => {
  let response;
  try {
    response = await axios.get(`http://localhost:3000/vehicles/${licensePlate}`);
  } catch (error) {
    return { status: 400, error };
  }
  if (!response.data) {
    return { status: 400, error: 'Vehicle does not exist' };
  }
  return response.data;
};

const getValuesForResidentReport = async (ResidentTime) => {
  let residentTimes;
  try {
    residentTimes = await ResidentTime.find();
  } catch (error) {
    return { status: 400, error };
  }
  residentTimes = residentTimes.map((residentTime) => ({
    ...residentTime._doc,
    toPay: residentTime.time * 0.05,
  }));
  return residentTimes;
};

module.exports = {
  updateResidentTime, findLatestStay, findVehicle, getValuesForResidentReport,
};
