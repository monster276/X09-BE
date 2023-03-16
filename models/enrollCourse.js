const mongoose = require("mongoose");
const enrollCourseSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("enrollCourse", enrollCourseSchema);
