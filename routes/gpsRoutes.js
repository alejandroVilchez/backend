const express = require("express");
const { createGPSData, getGPSData } = require("../controllers/gpsController");
const gpsRouter = express.Router();
gpsRouter.post("/", createGPSData);
gpsRouter.get("/regattas", getGPSData);
module.exports = gpsRouter;