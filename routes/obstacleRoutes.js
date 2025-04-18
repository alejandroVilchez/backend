const express = require("express");
const { createObstacle } = require("../controllers/obstacleController");
const obstacleRouter = express.Router();
obstacleRouter.post("/", createObstacle);
module.exports = obstacleRouter;

obstacleRouter.get("/", getAllObstacles);
obstacleRouter.delete("/:id", deleteObstacle); 