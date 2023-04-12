const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  lesson: {
    type: Date,
    required: true,
  },
  presence: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const attendancesSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("studentAttendance", attendancesSchema);
