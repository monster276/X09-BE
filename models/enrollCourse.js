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
    location: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Location',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    status: {
      type: Number,
      required: true,

    }

  },
  { timestamps: true },
)
const enrollCourse = mongoose.model('enrollCourse', enrollCourseSchema)
module.exports = enrollCourse
