const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  courseTime: {
    type: String,
    required: true,
  },
  classTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
