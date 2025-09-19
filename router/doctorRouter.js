const express = require('express');
const router = express.Router();
const {CreateDoctor , getAllDoctor , doctorID ,  uploadDoctorImage , Count} = require('../controllers/doctorController.js')
const upload = require('../utils/upload');    

router.route("/addDoctor").post(  uploadDoctorImage , CreateDoctor)
router.route("/getAllDoctor").get(getAllDoctor)
router.route('/:id').post(doctorID)






module.exports = router;