const router = require("express").Router();
const { createObstacle, getAllObstacles, deleteObstacle } = require("../controllers/obstacleController");
const { authMiddleware } = require("../controllers/userController");
router.use(authMiddleware);
router.post("/", createObstacle);
router.get("/", getAllObstacles);
router.delete("/:id", deleteObstacle); 
module.exports = router;
