const mongoose = require("mongoose");

const classroomSchema = mongoose.Schema({
  id: {
    type: "String",
    required: true,
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
});

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;
