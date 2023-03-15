const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  courseTime: {
    type: String,
    required: true,
  },
  classTime: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
