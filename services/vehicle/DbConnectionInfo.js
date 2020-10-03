const dbConnectionInfo = {
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  model: process.env.MONGO_VEHICLE,
};

module.exports = dbConnectionInfo;
