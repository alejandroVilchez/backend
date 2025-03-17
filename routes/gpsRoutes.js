const express = require("express");
const { createGPSData } = require("../controllers/gpsController");
const gpsRouter = express.Router();
gpsRouter.post("/", createGPSData);
module.exports = gpsRouter;