const multer = require("multer");

module.exports = (req, res) => {
  const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
  };
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "src/images");
    },
    filename: (req, file, callback) => {
      try {
        const name = file.originalname.split(".")[0].split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        if (!extension) {
          throw new Error("Invalid file extension");
        }
        callback(null, name + Date.now() + "." + extension);
      } catch (error) {
        callback(error);
      }
    },
  });

  multer({ storage: storage }).single("image")(req, res);
};
