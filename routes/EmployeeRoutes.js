//router -->
const router = require("express").Router()    
const employeeController = require("../controller/EmployeeController");
const middlewareTest = require("../utils/MiddlewareTest");
const zodMiddleware = require("../middleware/ZodMiddleware");
const employeeValidationSchema = require("../utils/EmployeeValidationSchema");
const limitedRequestsMiddleware = require('../middleware/LimitedRequestMiddleware')
const authMiddleware = require('../middleware/AuthMiddleware')

// API's 
router.get("/count/employee/:id",authMiddleware.authUser,limitedRequestsMiddleware,employeeController.getAllEmployees);

router.post("/employee",middlewareTest,employeeController.addEmployee);

router.delete("/employee/:id",employeeController.deleteEmployee);
router.put("/employee/:id",employeeController.updateEmployee);
router.get("/employee/:id",employeeController.getEmployeeById);
router.get("/employee1/filter",employeeController.filterEmployee);
router.post("/employee/login",employeeController.loginEmployee)
//
module.exports = router;