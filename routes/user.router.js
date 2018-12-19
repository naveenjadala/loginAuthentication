const express = require('express');
const router = express.Router();
const {User, validateUser} = require('../models/user.module');
const userCtrl = require('../controllers/user.controller');

router.post("/user",userCtrl.saveUser);

module.exports = router;