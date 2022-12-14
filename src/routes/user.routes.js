const router = require("express").Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user.controller");
const multerImg = require("../middleware/multer-img");

router.get("/users", auth, userCtrl.getUsers);
router.get("/user/:id", auth, userCtrl.getOneUser);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete/:id", auth, userCtrl.deleteUser);
router.put("/update/:id", auth, multerImg, userCtrl.updateUser);

router.get("/check", auth, userCtrl.checkAuth);

module.exports = router;
