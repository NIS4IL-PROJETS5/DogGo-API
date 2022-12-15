const router = require("express").Router();

const auth = require("../middleware/auth");
const docCtrl = require("../controllers/doc.controller");
const multerDocs = require("../middleware/multer-docs");

router.get("/doc/:id", auth, docCtrl.getOneDocument);
router.post("/doc/create", auth, multerDocs, docCtrl.createDocument);
router.put("/doc/update/:id", auth, docCtrl.updateDocument);
router.delete("/doc/delete/:id", auth, docCtrl.deleteDocument);

router.get("/reqDocs", auth, docCtrl.getAllRequiredDocs);
router.post("/reqDoc/create", auth, multerDocs, docCtrl.createRequiredDoc);
router.put("/reqDoc/update/:id", auth, docCtrl.updateRequiredDoc);
router.delete("/reqDoc/delete/:id", auth, docCtrl.deleteRequiredDoc);

router.get("/userDocs", auth, docCtrl.getAllUserDocs);

module.exports = router;
