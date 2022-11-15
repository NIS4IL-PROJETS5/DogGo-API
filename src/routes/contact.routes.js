const router = require("express").Router();

const auth = require("../middleware/auth");
const conCtrl = require("../controllers/contact.controller.js");

router.get("/", auth, conCtrl.getAllContacts);
router.get("/contact/:id", auth, conCtrl.getOneContact);
router.post("/create", auth, conCtrl.createContact);

module.exports = router;
