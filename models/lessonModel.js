const mongoose = require("mongoose");

const lessonModel = new mongoose.Schema({
  lecture: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Lecture",
  },
  order: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Lesson = mongoose.model("Lesson", lessonModel);

module.exports = Lesson;
