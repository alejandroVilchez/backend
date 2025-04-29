// services/simulator.js
const Boat   = require('../models/Boat');
const GPSData= require('../models/GPSData');
const { clients } = require('./websocket');
const WebSocket = require('ws');


async function seedBoats(regattaId, count = 5) {
  // ejemplo: todos en lat=0, lon=0 con pequeñas variaciones
  const boats = Array.from({ length: count }, (_, i) => ({
    regattaId,
    name:     `Barco #${i+1}`,
    latitude: 0  + Math.random()*0.01,
    longitude: 0 + Math.random()*0.01,
    yaw:      0
  }));
  return Boat.insertMany(boats);
}

async function startRegattaSimulation(regattaId) {
  let boats = await Boat.find({ regattaId });
  if (boats.length === 0) {
    boats = await seedBoats(regattaId, 5);
  }
  const intervals = boats.map(startBoatSimulation);
  return intervals; // un array de intervalIds
}

function startBoatSimulation(boat) {
  return setInterval(async () => {
    // 1) Simula movimiento - avanza al norte y yaw aleatorio
    boat.latitude  += 0.0001;
    boat.longitude += 0;
    boat.yaw        = (boat.yaw + 5) % 360;
    boat.updatedAt = new Date();
    await boat.save();

    await GPSData.create({
      regattaId: boat.regattaId,
      latitude:  boat.latitude,
      longitude: boat.longitude,
      yaw:       boat.yaw
    });

    const key = boat.regattaId.toString();
    for (let ws of clients.get(key) || []) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          regattaId: boat.regattaId,
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

module.exports = { startBoatSimulation };

