const router = require('express').Router();
const departmentController = require('../controller/DepartmentController');

router.post('/department',departmentController.addDepartment)
router.get('/department',departmentController.getAllDepartments)

module.exports=router