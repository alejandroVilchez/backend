// controllers/simulationController.js
const Boat= require("../models/Boat");
const { seedBoats, startBoatSimulation } = require("../services/simulator");

let intervalsMap = new Map();

exports.startRegattaSimulation = async (req, res) => {
  const { regattaId } = req.params;

  if (intervalsMap.has(regattaId)) {
    return res.status(400).json({ message: "Simulación ya en marcha" });
  }

  let boats = await Boat.find({ regattaId });
  if (boats.length === 0) {
    boats = await seedBoats(regattaId, 5);
  }

  const timers = boats.map(b => startBoatSimulation(b));
  intervalsMap.set(regattaId, timers);

  res.json({
    message:     "Simulación iniciada",
    boatsSeeded: boats.length
  });
};

exports.stopRegattaSimulation = async (req, res) => {
  const { regattaId } = req.params;
  const timers = intervalsMap.get(regattaId) || [];
  timers.forEach(clearInterval);
  intervalsMap.delete(regattaId);
  res.json({ message: "Simulación detenida" });
};
