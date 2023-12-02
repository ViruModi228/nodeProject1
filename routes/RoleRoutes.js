const router = require("express").Router();
const roleController = require("../controller/RoleController");
router.post("/role", roleController.addRole);
module.exports = router;