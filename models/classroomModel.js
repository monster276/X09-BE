const mongoose = require("mongoose");

const classroomSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Location",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  numberOfLessons: {
    type: Number,
    required: true,
  },
  classTime: {
    type: Number,
    required: true,
  },
  schedule: {
    type: [],
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;
