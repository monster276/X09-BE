const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: "https://fireship.io/img/default-cover.png",
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
  maxNumberOfStudents: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
