const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const course = await Course.create({
    name: req.body.name,
    description: req.body.description,
    createdBy: req.user.name,
  });
  try {
    res.status(201).json({
      status: "success",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    const dashboard = await Course.find({ createdBy: req.user.name });
    res.status(200).json({
      status: "success",
      courses,
      dashboard,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    res.status(200).json({
      status: "success course detail",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    course.name = req.body.name;
    course.description = req.body.description;
    course.save();
    res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.deleteOne({ slug: req.params.slug });
    res.status(200).json({
      course,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error,
    });
  }
};
