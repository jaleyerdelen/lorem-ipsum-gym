const express = require('express');
const categoryController = require('../controllers/categoryController');


const router = express.Router();


router.route("/").post(categoryController.createCategory)
router.route("/").get(categoryController.getAllCategory)
router.route("/:slug").get(categoryController.getCategory)


module.exports = router;

