const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/documents");
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

module.exports = multer({ storage: storage }).single("file");
