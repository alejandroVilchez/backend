// controllers/boatController.js
const Boat = require('../models/Boat');
exports.listBoats = async (req, res) => {
  const boats = await Boat.find({ regattaId: req.params.regattaId });
  res.json(boats);
};
