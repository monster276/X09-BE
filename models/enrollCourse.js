const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

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
      default: '1',
      required: true,
    },
  },
  { timestamps: true },
)
enrollCourseSchema.plugin(mongoosePaginate);
const enrollCourse = mongoose.model('enrollCourse', enrollCourseSchema)
module.exports = enrollCourse
