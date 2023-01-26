const router = require("express").Router();

const auth = require("../middleware/auth");
const actCtrl = require("../controllers/actualite.controller.js");
const { image } = require("../middleware/multer");

router.get("/", actCtrl.getAllActualites);
router.get("/limit/:type/:limit", actCtrl.getLimitedActualites);
router.get("/:id", actCtrl.getOneActualite);
router.post("/create", auth, actCtrl.createActualite);
router.delete("/delete/:id", auth, actCtrl.deleteActualite);
router.put("/update/:id", auth, actCtrl.updateActualite);

router.post("/image/add/:id", auth, image, actCtrl.addImageToActualite);
router.get("/images/:id", actCtrl.getImagesForActualite);

module.exports = router;
