const mongoose = require('mongoose');

const obstacleSchema = new mongoose.Schema({
  latitude:  { type: Number, required: true },
  longitude: { type: Number, required: true },
  type:      { type: String, required: true },

});

module.exports = mongoose.model('Obstacle', obstacleSchema);