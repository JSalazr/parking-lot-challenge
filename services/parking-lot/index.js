// Express
const express = require('express');

const app = express();

app.use(express.json());

const parkingStaysController = require('./controllers/parkingStayController');

app.get('/parkingStays', parkingStaysController.getAllActive);

app.post('/parkingStays/entrance', parkingStaysController.registerEntrance);

app.put('/parkingStays/exit', parkingStaysController.registerExit);

app.put('/parkingStays/newMonth', parkingStaysController.startNewMonth);
const server = app.listen(3001, () => {
  console.log('ParkingLot service up and running');
});

module.exports = server;
