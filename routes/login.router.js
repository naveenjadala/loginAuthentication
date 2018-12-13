const express = require('express');
const router = express.Router();
const loginctrl = require("../controllers/login.controller");

router.post("/login", loginctrl.loginUser);

module.exports = router;
