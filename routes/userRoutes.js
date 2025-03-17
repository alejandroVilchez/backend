const express = require("express");
const { createUser } = require("../controllers/userController");
const { getUsers } = require("../controllers/userController");
const { get } = require("mongoose");
const router = express.Router();
router.post("/register", createUser);
router.post("/login", getUsers);
module.exports = router;