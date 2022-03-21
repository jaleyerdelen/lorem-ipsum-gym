const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const slugify = require('slugify');

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;

// CourseSchema.pre('validate', function(next){
//   this.slug = slugify(this.name, {
//     lower:true,
//     strict:true
//   })
//   next();
// })