const express = require('express');
const router = express.Router();
const {GetAllDepartminte , createDepartment , deleteDepartment } = require('../controllers/departmentController')
const {Protect} = require('../Middleware/authMiddleware')
const upload = require('../utils/upload');  

router.route('/alldeparment').get(GetAllDepartminte);
router.route('/createDepartment').post(createDepartment )
router.route('/deleteDepartment/:id').delete(deleteDepartment)


module.exports = router ;