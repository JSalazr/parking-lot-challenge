const axios = require('axios');
const moment = require('moment');
const ParkingStay = require('../dbConnection');

const parkingStayController = {
  getAllActive: async (req, res) => {
    res.status(200).json(await ParkingStay.find({ active: true }));
  },
  registerEntrance: async (req, res) => {
    let existingStay;
    try {
      existingStay = await ParkingStay.findOne({ licensePlate: req.body.licensePlate });
    } catch (error) {
      res.status(400).send(error);
    }
    if (existingStay) {
      res.status(400).send('Vehicle has an active stay');
      return;
    }
    let response;
    try {
      response = await axios.get(`http://localhost:${process.env.VEHICLE_PORT}/vehicles/${req.body.licensePlate}`);
    } catch (error) {
      res.status(400).send(error);
    }
    if (!response.data) {
      res.status(400).send('Vehicle does not exist');
      return;
    }
    const newparkingStay = {
      licensePlate: req.body.licensePlate,
      entranceDate: moment(),
      active: true,
    };

    const parkingStay = new ParkingStay(newparkingStay);

    try {
      await parkingStay.save();
    } catch (error) {
      res.status(400).send(error);
    }
    res.status(201).send();
  },
  registerExit: async (req, res) => {
    let existingStay;
    try {
      existingStay = await ParkingStay.findOne({ licensePlate: req.body.licensePlate });
    } catch (error) {
      res.status(400).send(error);
    }
    if (!existingStay) {
      res.status(400).send('Vehicle doest not have an active stay');
      return;
    }
    let vehicle;
    try {
      vehicle = (await axios.get(`http://localhost:${process.env.VEHICLE_PORT}/vehicles/${req.body.licensePlate}`)).data;
    } catch (error) {
      res.status(400).send(error);
    }
    if (!vehicle) {
      res.status(400).send('Vehicle does not exist');
      return;
    }
    const exitDate = moment();
    const amountToPay = exitDate.diff(moment(existingStay.entranceDate), 'minutes');
    try {
      await ParkingStay.updateOne(
        { licensePlate: req.body.licensePlate },
        { exitDate },
      );
    } catch (error) {
      res.status(400).send(error);
    }

    res.status(200).send({ amountToPay: vehicle.vehicleType ? 0 : amountToPay });
  },
};

module.exports = parkingStayController;
