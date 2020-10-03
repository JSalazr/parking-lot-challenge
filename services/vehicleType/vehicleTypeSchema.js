const mongoose = require('mongoose');

const vehicleType = new mongoose.Schema({
  type: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = vehicleType;
