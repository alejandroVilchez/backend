const mongoose = require("mongoose");

const gpsDataSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  regattaId: { type: String, required: true }
});

const GPSData = mongoose.model("GPSData", gpsDataSchema);
module.exports = GPSData;
