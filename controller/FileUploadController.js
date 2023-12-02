const multer = require("multer");
const googleController = require('../controller/GoogleController')

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
        cb(null, true);

    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("file");

const uploadFile = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      // google drive m daalva rhe h

      googleController.uploadFile(req.file.path)

      res.status(200).json({
        message: "success",
        file: req.file,
      });
    }
  });
};

module.exports = {
  uploadFile,
};