const router = require("express").Router();

const auth = require("../middleware/auth");
const actCtrl = require("../controllers/actualite.controller.js");

router.get("/", actCtrl.getAllActualites);
router.get("/limit/:limit", actCtrl.getLimitedActualites);
router.get("/:id", actCtrl.getOneActualite);
router.post("/create", auth, actCtrl.createActualite);
router.delete("/delete/:id", auth, actCtrl.deleteActualite);
router.put("/update/:id", auth, actCtrl.updateActualite);

module.exports = router;
