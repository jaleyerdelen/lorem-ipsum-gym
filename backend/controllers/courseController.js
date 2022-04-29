const Course = require("../models/Course");
const slugify = require('slugify')

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
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
    res.status(200).json({
      status: "success",
      courses,
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
  const course = await Course.findOne({slug:req.params.slug});
  console.log("course",req.body);
course.name =  req.body.name
course.description = req.body.description
course.save()
res.status(200).json({
   
    course
  })
} catch (error) {
  console.log(error);
}
}