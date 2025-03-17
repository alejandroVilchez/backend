const { createObstacle } = require("../controllers/obstacleController");
const obstacleRouter = express.Router();
obstacleRouter.post("/", createObstacle);
module.exports = obstacleRouter;