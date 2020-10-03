const mongoose = require('mongoose');

const vehicle = new mongoose.Schema({
  licensePlate: {
    type: String,
    require: true,
    unique: true,
  },
  vehicleType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VehicleType',
  },
});

module.exports = vehicle;
