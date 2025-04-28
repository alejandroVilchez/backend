// controllers/simulationController.js
const Boat= require('../models/Boat');
const { startBoatSimulation } = require('../services/simulator');

const intervals = new Map();

exports.startRegattaSimulation = async (req, res) => {
  const regattaId = req.params.regattaId;
  const durationSec = parseInt(req.query.t) || 0;

  const boats = await Boat.find({ regattaId });
  boats.forEach(boat => {
    const key = boat._id.toString();
    if (!intervals.has(key)) {
      const timerId = startBoatSimulation(boat);
      intervals.set(key, timerId);

      if (durationSec > 0) {
        setTimeout(() => {
          clearInterval(timerId);
          intervals.delete(key);
        }, durationSec * 1000);
      }
    }
  });

  res.json({ message: 'Simulación iniciada', boats: boats.length, durationSec });
};

exports.stopRegattaSimulation = async (req, res) => {
  const regattaId = req.params.regattaId;
  for (let [boatId, timerId] of intervals) {
    const boat = await Boat.findById(boatId);
    if (boat && boat.regattaId.toString() === regattaId) {
      clearInterval(timerId);
      intervals.delete(boatId);
    }
  }
  res.json({ message: 'Simulación detenida' });
};
