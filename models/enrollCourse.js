const mongoose = require('mongoose')
const enrollCourseSchema = new mongoose.Schema(
  {
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
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)
const enrollCourse = mongoose.model('enrollCourse', enrollCourseSchema)
module.exports = enrollCourse
