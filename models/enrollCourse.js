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
<<<<<<< HEAD
    }
=======
    },
>>>>>>> efed287dd09c4fcb8f54dd6f85a36eff2e9748e2
  },
  { timestamps: true },
)
const enrollCourse = mongoose.model('enrollCourse', enrollCourseSchema)
module.exports = enrollCourse
