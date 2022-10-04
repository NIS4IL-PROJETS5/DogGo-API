const router = require("express").Router();

const actCtrl = require("../controllers/actualites.controller.js");

router.get("/", actCtrl.findAll);
router.get("/:id", actCtrl.findOne);

module.exports = router;
