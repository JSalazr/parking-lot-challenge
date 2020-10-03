const mongoose = require('mongoose');

const vehicle = new mongoose.Schema({
  licensePlate: {
    type: String,
    require: true,
  },
});

module.exports = vehicle;
