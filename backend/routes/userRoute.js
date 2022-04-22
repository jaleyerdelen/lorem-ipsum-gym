const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").post(authController.createUser);
router.route("/").get(authController.getAllUser);



module.exports = router;
