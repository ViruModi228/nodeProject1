const fileUploadController = require('../controller/FileUploadController');

const router = require('express').Router();
router.post('/upload', fileUploadController.uploadFile);
module.exports = router;