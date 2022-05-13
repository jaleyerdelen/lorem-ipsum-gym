const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require("../middleware/authMiddleware")
const authController = require('../controllers/authController');

const router = express.Router();


router.route("/").post(authMiddleware.secure, authController.userRole("teacher", "admin"),categoryController.createCategory)
router.route("/").get(categoryController.getAllCategory)
router.route("/:slug").get(categoryController.getCategory)
router.route("/:id").delete(authMiddleware.secure, authController.userRole("teacher", "admin"), categoryController.deleteCategory)

module.exports = router;

