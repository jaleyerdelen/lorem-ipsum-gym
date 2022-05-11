const express = require("express");
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController")

const router = express.Router();

router.use(authController.userRole("teacher","admin"))

router.route("/").post(courseController.createCourse);
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);
router.route("/:slug").put(courseController.updateCourse);
router.route("/:slug").delete(courseController.deleteCourse);


module.exports = router;
