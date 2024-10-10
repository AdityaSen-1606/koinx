const express = require("express");
const { getCryptoStats } = require("../controller/stats.controller");
const { getPriceDeviation } = require("../controller/deviation.controller");

const router = express.Router();


router.get("/stats", getCryptoStats);
router.get("/deviation", getPriceDeviation);

module.exports = router; 
