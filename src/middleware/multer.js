const multer = require("multer");

const MIME_TYPES_IMG = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
const MIME_TYPES_DOC = {
  ...MIME_TYPES_IMG,
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

function store(type, folder) {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      console.log(file);
      callback(null, `src/${folder}`);
    },
    filename: (req, file, callback) => {
      try {
        const name = file.originalname.split(".")[0].split(" ").join("_");
        const extension = type[file.mimetype];
        if (!extension) {
          throw new Error("Invalid file extension");
        }
        callback(null, name + Date.now() + "." + extension);
      } catch (error) {
        callback(error);
      }
    },
  });
  return storage;
}

exports.file = (req, res, next) => {
  const storage = store(MIME_TYPES_DOC, "documents");
  multer({ storage: storage }).single("file")(req, res, next);
};

exports.image = (req, res, next) => {
  const storage = store(MIME_TYPES_IMG, "images");
  return multer({ storage: storage }).single("image")(req, res, next);
};
