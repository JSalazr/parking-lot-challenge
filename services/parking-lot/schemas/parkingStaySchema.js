const mongoose = require('mongoose');

const parkingStay = new mongoose.Schema({
  licensePlate: {
    type: String,
    require: true,
    unique: true,
  },
  entranceDate: {
    type: Date,
    require: true,
  },
  exitDate: {
    type: Date,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

module.exports = parkingStay;
