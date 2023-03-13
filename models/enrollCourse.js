const mongoose = require('mongoose')
const enrollCourseSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
})
module.exports = mongoose.model('enrollCourse', enrollCourseSchema)
