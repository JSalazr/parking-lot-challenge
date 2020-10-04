const path = require('path');
const gateway = require('express-gateway');
// const mongoose = require('mongoose');

require('dotenv').config();
require('./services/vehicle');
require('./services/parking-lot');

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.awfq1.mongodb.net/default?retryWrites=true&w=majority`, () => {
//   console.log('Connected to MongoDB');
// });

gateway()
  .load(path.join(__dirname, 'config'))
  .run();
