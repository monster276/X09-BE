const mongoose = require("mongoose");

const classroomSchema = mongoose.Schema({
  id: {
    type: "String",
    require: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  name: {
    type: String,
    require: true,
  },
  startTime: {
    type: Date,
    require: true,
  },
  endTime: {
    type: Date,
    require: true,
  },
  numberOfLessons: {
    type: Number,
    require: true,
  },
  classTime: {
    type: Number,
    require: true,
  },
});

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;
