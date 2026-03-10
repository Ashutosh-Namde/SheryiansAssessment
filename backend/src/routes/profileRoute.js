const express = require("express");
const profileController = require("../controllers/profileController");
const profileMiddleware = require("../middleware/profileMiddleware");

const router = express.Router();

router.get("/data",profileMiddleware,profileController)

module.exports = router