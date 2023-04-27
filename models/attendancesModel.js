const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  lesson: {
    type: String,
  },
  presence: {
    type: String,
    default: "",
  },
  score: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    default: "",
  },
  index: {
    type: String,
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
  attendances: [attendanceSchema],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudentAttendance", studentAttendanceSchema);
