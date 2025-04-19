const express = require("express");
const { createObstacle } = require("../controllers/obstacleController");
const obstacleRouter = express.Router();
obstacleRouter.post("/", createObstacle);
obstacleRouter.get("/", getAllObstacles);
obstacleRouter.delete("/:id", deleteObstacle); 
module.exports = obstacleRouter;
