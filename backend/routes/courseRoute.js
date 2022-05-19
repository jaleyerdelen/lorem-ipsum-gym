const express = require("express");
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();

//router.use(authController.userRole("teacher","admin"))

router.route("/").post(authMiddleware.secure, authController.userRole("admin", "teacher"),courseController.createCourse);
router.route("/").get(authMiddleware.secure, authController.userRole("admin","teacher","student"),courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);
router.route("/:slug").put(courseController.updateCourse);
router.route("/:slug").delete(courseController.deleteCourse);
router.route("/enroll").post(authMiddleware.secure, authController.userRole("student","admin", "teacher"),courseController.enrollCourse);

module.exports = router;
