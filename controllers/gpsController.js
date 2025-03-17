const GPSData = require("../models/GPSData");
exports.createGPSData = async (req, res) => {
    try {
        const gpsData = new GPSData(req.body);
        await gpsData.save();
        res.status(201).json(gpsData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};