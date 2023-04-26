const mongoose = require('mongoose')
const feedbackModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      require: String,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Classroom',
    },
    teacherFeedback: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      teacherknowledge: {
        type: String,
        require: true,
      },
      followUp: {
        type: String,
        require: true,
      },
    },
    courseFeedback: {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
      },
      Courseknowledge: {
        type: String,
        require: true,
      },
      documentCourse: {
        type: String,
        require: true,
      },
    },
    anotherFeedback: {
      type: String,
    },
  },
  { timestamps: true },
)
const Feedback = mongoose.model('Feedback', feedbackModel)
module.exports = Feedback
