const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();

router.route("/").post(authController.createUser);
router.route("/").get(authMiddleware.secure,authController.userRole("admin") ,authController.getAllUser);
router.route("/:id").delete(authMiddleware.secure, authController.userRole("admin"),authController.deleteUser)
router.route("/profile").get(authMiddleware.secure, authController.getProfile)

module.exports = router;
