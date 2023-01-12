const router = require("express").Router();

const auth = require("../middleware/auth");
const docCtrl = require("../controllers/doc.controller");
const { file } = require("../middleware/multer");
const { route } = require("./actualite.routes");

router.get("/doc/:id", auth, docCtrl.getOneDocument);
router.post("/doc/create", auth, file, docCtrl.createDocument);
router.put("/doc/update/:id", auth, docCtrl.updateDocument);
router.delete("/doc/delete/:id", auth, docCtrl.deleteDocument);

router.get("/reqDocs", auth, docCtrl.getAllRequiredDocs);
router.post("/reqDoc/create", auth, file, docCtrl.createRequiredDoc);
router.put("/reqDoc/update/:id", auth, docCtrl.updateRequiredDoc);
router.delete("/reqDoc/delete/:id", auth, docCtrl.deleteRequiredDoc);
router.get("/reqDoc/user/incomplete", auth, docCtrl.getUncompleteUserDocs);
router.get("/reqDoc/user/sentornot", auth, docCtrl.getUserDocsSentOrNot);

router.get("/userDocs", auth, docCtrl.getAllUserDocs);

module.exports = router;
