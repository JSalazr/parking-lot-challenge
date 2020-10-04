const ParkingStay = require('../dbConnection');

const parkingStayController = {
  getAllActive: async (req, res) => {
    console.log('entro');
    res.status(200).json(await ParkingStay.find({ active: true }));
  },
};

module.exports = parkingStayController;
