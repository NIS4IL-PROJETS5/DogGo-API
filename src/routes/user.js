const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.get("/users", auth, userCtrl.getUsers);
router.get("/user/:id", auth, userCtrl.getUser);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete/:id", auth, userCtrl.deleteUser);
router.put("/update/:id", auth, userCtrl.updateUser);

module.exports = router;
