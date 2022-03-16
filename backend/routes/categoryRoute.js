const express = require('express');
const categoryController = require('../controllers/categoryController');


const router = express.Router();


router.route("/").post(categoryController.createCategory)
router.route("/").get(categoryController.getAllCategory)


module.exports = router;

