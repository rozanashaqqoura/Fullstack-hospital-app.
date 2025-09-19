const express = require('express');
const router = express.Router();
const { getCounts } = require('../controllers/countController');

router.route('/count').get(getCounts);

module.exports = router;
