require('regenerator-runtime/runtime');
require('core-js/stable');
const { VehicleType } = require('../dbConnection');

const vehicleTypeController = {
  getAll: async (req, res) => {
    res.status(200).json(await VehicleType.find());
  },
  findByType: async (req, res) => {
    const vehicleType = await VehicleType.findOne({ type: req.params.typeText });
    if (!vehicleType) {
      res.status(400).send();
    }
    res.status(200).json(vehicleType);
  },
  createVehicleType: async (req, res) => {
    const newVehicleType = {
      type: req.body.type,
    };

    const vehicleType = new VehicleType(newVehicleType);
    try {
      await vehicleType.save();
    } catch (error) {
      res.status(400).send();
    }
    res.status(201).send();
  },
};

module.exports = vehicleTypeController;
