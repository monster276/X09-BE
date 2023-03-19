const mongoose = require("mongoose");

const lectureModel = mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Lecture = mongoose.model("Lecture", lectureModel);

module.exports = Lecture;
