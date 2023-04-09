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
    required: false,
  },
  comment: {
    type: String,
    required: false,
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
