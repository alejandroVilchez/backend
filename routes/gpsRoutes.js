const { createGPSData } = require("../controllers/gpsController");
const gpsRouter = express.Router();
gpsRouter.post("/", createGPSData);
module.exports = gpsRouter;