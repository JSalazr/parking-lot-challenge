const { Vehicle, VehicleType } = require('../dbConnection');

const vehicleController = {
  getAll: async (req, res) => {
    res.status(200).json(await Vehicle.find().populate('vehicleType'));
  },
  findOne: async (req, res) => {
    res.status(200).json(await Vehicle.findOne({ licensePlate: req.params.licensePlate }).populate('vehicleType'));
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
  setVehicleType: async (req, res) => {
    try {
      const vehicleType = await VehicleType.findOne({ type: req.params.vehicleType });
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
