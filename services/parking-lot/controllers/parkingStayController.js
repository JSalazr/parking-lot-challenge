const moment = require('moment');
const { ParkingStay, ResidentTime } = require('../dbConnection');
const { updateResidentTime, findLatestStay, findVehicle } = require('../utils');

const parkingStayController = {
  getAllActive: async (req, res) => {
    res.status(200).json(await ParkingStay.find({ active: true }));
  },
  registerEntrance: async (req, res) => {
    const existingStay = await findLatestStay(ParkingStay, req.body.licensePlate);
    if (existingStay && existingStay.error) {
      res.status(existingStay.status).send(existingStay.error);
      return;
    }
    if (existingStay && !existingStay.exitDate) {
      res.status(400).send('Vehicle already has an active stay.');
      return;
    }
    const vehicle = findVehicle(req.body.licensePlate);
    if (vehicle.error) {
      res.status(vehicle.status).send(vehicle.error);
      return;
    }
    const newParkingStay = {
      licensePlate: req.body.licensePlate,
      entranceDate: moment(),
      active: true,
    };

    const parkingStay = new ParkingStay(newParkingStay);

    try {
      await parkingStay.save();
    } catch (error) {
      res.status(400).send(error);
    }
    res.status(201).send();
  },
  registerExit: async (req, res) => {
    const existingStay = await findLatestStay(ParkingStay, req.body.licensePlate);
    if (existingStay && existingStay.error) {
      res.status(existingStay.status).send(existingStay.error);
      return;
    }
    if (!existingStay || existingStay.exitDate) {
      res.status(400).send('Vehicle does not have an active stay.');
      return;
    }
    const vehicle = await findVehicle(req.body.licensePlate);
    if (vehicle.error) {
      res.status(vehicle.status).send(vehicle.error);
      return;
    }
    const exitDate = moment();
    const totalStay = exitDate.diff(moment(existingStay.entranceDate), 'minutes');
    try {
      await ParkingStay.updateOne(
        { _id: existingStay._id },
        { exitDate },
      );
    } catch (error) {
      res.status(400).send(error);
    }

    if (vehicle.vehicleType && vehicle.vehicleType.type === 'Resident') {
      await updateResidentTime(ResidentTime, req.body.licensePlate, totalStay);
    }

    res.status(200).send({ amountToPay: vehicle.vehicleType ? 0 : totalStay * 0.5 });
  },
};

module.exports = parkingStayController;
