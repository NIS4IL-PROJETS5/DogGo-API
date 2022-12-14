const router = require("express").Router();
const auth = require("../middleware/auth");
const dogCtrl = require("../controllers/dog.controller");

router.get("/", auth, dogCtrl.getAllDogs);
router.get("/dog/:id", auth, dogCtrl.getOneDog);
router.post("/create", auth, dogCtrl.createDog);
//router.put("/update/:id", auth, dogCtrl.updateDog);
//router.delete("/delete/:id", auth, dogCtrl.deleteDog);

module.exports = router;
