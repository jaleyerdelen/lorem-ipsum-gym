const express = require("express");
const authController = require("../controllers/authController");


const router = express.Router();

router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
  //router.route("/secure").get(authController.secure)



module.exports = router;
