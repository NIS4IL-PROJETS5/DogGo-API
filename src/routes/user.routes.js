const router = require("express").Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user.controller");
const { image } = require("../middleware/multer");

router.get("/users", auth, userCtrl.getUsers);
router.get("/user/:id", auth, userCtrl.getOneUser);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete/:id", auth, userCtrl.deleteUser);
router.put("/update/:id", auth, image, userCtrl.updateUser);

router.get("/check", auth, userCtrl.checkAuth);

module.exports = router;
