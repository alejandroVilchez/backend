// services/simulator.js
const Boat    = require('../models/Boat');
const GPSData = require('../models/GPSData');
const { clients } = require('./websocket');
const WebSocket   = require('ws');


async function seedBoats(regattaId, count = 5) {
  const boats = Array.from({ length: count }, (_, i) => ({
    regattaId,
    name:      `Barco #${i+1}`,
    latitude:  0  + Math.random() * 0.01,
    longitude: 0  + Math.random() * 0.01,
    yaw:       0
  }));
  return Boat.insertMany(boats);
}


function startBoatSimulation(boat) {
  const regId = boat.regattaId.toString();
  return setInterval(async () => {
    boat.latitude  += 0.0001;
    boat.yaw        = (boat.yaw + 5) % 360;
    boat.updatedAt = new Date();
    await boat.save();

    await GPSData.create({
      regattaId: regId,
      latitude:  boat.latitude,
      longitude: boat.longitude,
      yaw:       boat.yaw
    });

    for (const ws of clients.get(regId) || []) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          regattaId: regId,
          boatId:    boat._id,
          latitude:  boat.latitude,
          longitude: boat.longitude,
          yaw:       boat.yaw,
          timestamp: Date.now()
        }));
      }
    }
  }, 1000);
}

module.exports = { seedBoats, startBoatSimulation };
