const router = require("express").Router();

const auth = require("../middleware/auth");
const adhCtrl = require("../controllers/adherent.controller.js");

router.get("/", adhCtrl.getAdherents);
router.get("/:id", adhCtrl.getOneAdherent);
router.post("/create", auth, adhCtrl.createAdherent);
router.delete("/delete/:id", auth, adhCtrl.deleteAdherent);
router.put("/update/:id", auth, adhCtrl.updateAdherent);

module.exports = router;
