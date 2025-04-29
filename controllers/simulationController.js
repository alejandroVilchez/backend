// controllers/simulationController.js
const Boat   = require('../models/Boat');
const GPSData = require('../models/GPSData');
const { seedBoats, startBoatSimulation } = require('../services/simulator');

// Mapa global: regattaId → (boatId → timerId)
const intervalsMap = new Map();

exports.startRegattaSimulation = async (req, res) => {
  const regattaId   = req.params.regattaId;
  const durationSec = parseInt(req.query.t, 10) || 0;

  if (!intervalsMap.has(regattaId)) {
    intervalsMap.set(regattaId, new Map());
  }
  const boatTimers = intervalsMap.get(regattaId);

  // 1) Obtén o siembra barcos
  let boats = await Boat.find({ regattaId });
  if (boats.length === 0) {
    boats = await seedBoats(regattaId, 5);
  }

  // 2) Para cada barco, si no tiene timer, arrancamos la simulación
  boats.forEach(boat => {
    const key = boat._id.toString();
    if (!boatTimers.has(key)) {
      // lanzar intervalo
      const timerId = startBoatSimulation(boat);

      // si hay duración, programa el clear
      if (durationSec > 0) {
        setTimeout(() => {
          clearInterval(timerId);
          boatTimers.delete(key);
        }, durationSec * 1000);
      }

      boatTimers.set(key, timerId);
    }
  });

  res.status(200).json({
    message:     'Simulación iniciada',
    boats:       boats.length,
    durationSec
  });
};

exports.stopRegattaSimulation = async (req, res) => {
  const regattaId = req.params.regattaId;
  const boatTimers = intervalsMap.get(regattaId);
  if (boatTimers) {
    // limpia todos los timers
    for (const [, timerId] of boatTimers) {
      clearInterval(timerId);
    }
    intervalsMap.delete(regattaId);
  }
  res.status(200).json({ message: 'Simulación detenida' });
};
