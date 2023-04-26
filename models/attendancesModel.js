const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  lesson: {
    type: String,
    default: "",
  },
  presence: {
    type: String,
    default: "",
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  comment: {
    type: String,
    default: "",
  },
});

const studentAttendanceSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Classroom",
  },
  attendances: [],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudentAttendance", studentAttendanceSchema);
