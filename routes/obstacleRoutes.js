const express = require("express");
const { createObstacle, getAllObstacles, deleteObstacle } = require("../controllers/obstacleController");
const obstacleRouter = express.Router();
obstacleRouter.post("/", createObstacle);
obstacleRouter.get("/", getAllObstacles);
obstacleRouter.delete("/:id", deleteObstacle); 
module.exports = obstacleRouter;
