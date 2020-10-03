const path = require('path');
const gateway = require('express-gateway');

require('dotenv').config()
require("./services/vehicle")

gateway()
  .load(path.join(__dirname, 'config'))
  .run();
