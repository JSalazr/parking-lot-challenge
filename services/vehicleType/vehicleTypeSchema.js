const mongoose = require('mongoose');

const vehicleType = new mongoose.Schema({
  type: {
    type: String,
    require: true,
  },
});

module.exports = vehicleType;
