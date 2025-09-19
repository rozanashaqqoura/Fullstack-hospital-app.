const express = require('express');
const router = express.Router();
const {createAppointment , allAppointment , dalAppointment} = require('../controllers/appointmentController')
const {Protect} = require('../Middleware/authMiddleware')

router.route('/createAppointment').post(Protect , createAppointment)
router.route('/allAppointment').get(Protect , allAppointment)
router.route('/dalAppointment/:id').post(dalAppointment)







module.exports = router;