const router = require("express").Router();
const {listBoats} = require("../controllers/boatController");

router.get("/", listBoats);

module.exports = router;