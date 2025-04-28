// services/simulator.js
const Boat   = require('../models/Boat');
const GPSData= require('../models/GPSData');
const { clients } = require('./websocket');
const WebSocket = require('ws');


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

