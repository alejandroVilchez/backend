const router = require("express").Router();
const {listBoats, createBoat} = require("../controllers/boatController");

router.get("/", listBoats);
//router.post("/", createBoat);
module.exports = router;