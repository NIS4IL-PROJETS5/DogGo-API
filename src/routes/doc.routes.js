const router = require("express").Router();

const auth = require("../middleware/auth");
const docCtrl = require("../controllers/doc.controller");
const { file } = require("../middleware/multer");
const { route } = require("./actualite.routes");

router.get("/doc/get/:id", auth, docCtrl.getOneDocument);
router.get("/doc/user/status/:id", auth, docCtrl.getDocumentStatusForUser);
router.post("/doc/create", auth, file, docCtrl.createDocument);
router.get("/doc/download", docCtrl.downloadFile)
router.put("/doc/add/:id", auth, file, docCtrl.addFileToDocument);
router.delete("/doc/remove/:id", auth, docCtrl.removeFileFromDocument)
router.put("/doc/update/:id", auth, docCtrl.updateDocument);
router.delete("/doc/delete/:id", auth, docCtrl.deleteDocument);

router.get("/reqDocs", auth, docCtrl.getAllRequiredDocs);
router.post("/reqDoc/create", auth, file, docCtrl.createRequiredDoc);
router.put("/reqDoc/update/:id", auth, docCtrl.updateRequiredDoc);
router.delete("/reqDoc/delete/:id", auth, docCtrl.deleteRequiredDoc);
router.get("/reqDoc/user/incomplete", auth, docCtrl.getUncompleteUserDocs);
router.get("/reqDoc/user/sentornot", auth, docCtrl.getUserDocsSentOrNot);

router.get("/userDocs", auth, docCtrl.getAllUserDocs);
router.get("/userDocs/admin/all", auth, docCtrl.getAllUserDocsForAdmin);
router.get("/userDocs/admin/:id", auth, docCtrl.getUserDocsForAdmin);

module.exports = router;
