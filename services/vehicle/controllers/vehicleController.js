const { Vehicle, VehicleType } = require('../dbConnection');

const vehicleController = {
  getAll: async (req, res) => {
    res.status(200).json(await Vehicle.find().populate('vehicleType'));
  },
  createVehicle: async (req, res) => {
    const newVehicle = {
      licensePlate: req.body.licensePlate,
    };

    const vehicle = new Vehicle(newVehicle);

    try {
      await vehicle.save();
    } catch (error) {
      res.status(400).send(error);
    }
    res.status(201).send();
  },
  setVehicleAsOfficial: async (req, res) => {
    try {
      const vehicleType = await VehicleType.findOne({ type: 'Official' });
      await Vehicle.updateOne(
        { licensePlate: req.params.licensePlate },
        { vehicleType: vehicleType._id },
      );
    } catch (error) {
      res.status(400).send(error);
    }
    res.status(200).send();
  },
  setVehicleAsResident: async (req, res) => {
    try {
      const vehicleType = await VehicleType.findOne({ type: 'Resident' });
      await Vehicle.updateOne(
        { licensePlate: req.params.licensePlate },
        { vehicleType: vehicleType._id },
      );
    } catch (error) {
      res.status(400).send(error);
    }
    res.status(200).send();
  },
};

module.exports = vehicleController;
