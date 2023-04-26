const Feedback = require('../models/feedbackModel')
const User = require('../models/User')
const classroom = require('../models/classroomModel')
const course = require('../models/courseModel')

const FeedbackController = {
  reciveFeedback: async (req, res) => {
    try {
      const {
        name,
        email,
        phoneNumber,
        classroom,
        teacherFeedback,
        courseFeedback,
        anotherFeedback,
      } = req.body
      console.log(teacherFeedback)
      const newFeedback = await new Feedback({
        name,
        email,
        phoneNumber,
        classroom,
        teacherFeedback,
        courseFeedback,
        anotherFeedback,
      })
      const feedbackData = await newFeedback.save()
      res.status(200).json(feedbackData)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  getAllFeedback: async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword
      ? {
          $or: [
            {
              id: {
                $regex: req.query.keyword,
                $options: 'i',
              },
            },
            {
              fullName: {
                $regex: req.query.keyword,
                $options: 'i',
              },
            },
            {
              email: {
                $regex: req.query.keyword,
                $options: 'i',
              },
            },
          ],
        }
      : {}
    const count = await Feedback.countDocuments({ ...keyword })
    const FeedbacksData = await Feedback.find({ ...keyword })
      .sort({ createAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('classroom', 'name')
      .populate('teacherFeedback.user', 'fullName')
      .populate('courseFeedback.course', 'name')
    res.json({
      status: 'done',
      resutls: count,
      data: FeedbacksData,
      page,
      pages: Math.ceil(count / pageSize),
    })
  },
}
module.exports = FeedbackController
