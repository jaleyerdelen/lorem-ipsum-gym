const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: "string",
    required: true,
    unique: true,
  },
  description: {
    type: "string",
    required: true,
  },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
