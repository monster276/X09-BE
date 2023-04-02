const mongoose = require("mongoose");

const rollCallSchema = mongoose.Schema({
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Classroom",
  },
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

const studentSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  rollCall: [rollCallSchema],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
