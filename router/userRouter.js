const express = require('express');
const router = express.Router();
const { registerUser , LoginUser  } = require('../controllers/UserController');



router.route('/register').post(registerUser);
router.route('/login').post(LoginUser);







module.exports = router;