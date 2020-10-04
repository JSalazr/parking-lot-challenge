const mongoose = require('mongoose');

const residentTime = new mongoose.Schema({
  licensePlate: {
    type: String,
    require: true,
    unique: true,
  },
  time: {
    type: Number,
    require: true,
  },
});

module.exports = residentTime;
