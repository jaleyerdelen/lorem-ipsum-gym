const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slugify = require("slugify");

const CourseSchema = new Schema({
  name: {
    type: String,
    //required: true,
    unique: true,
  },
  description: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  createdBy: {
    type: String,
  }
});

CourseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
