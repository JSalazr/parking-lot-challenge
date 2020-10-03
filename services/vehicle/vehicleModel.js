const mongoose = require('mongoose');

mongoose.model('Vehicle', {
  licensePlate: {
    type: String,
    require: true,
  },
});
