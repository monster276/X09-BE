const Lesson = require('../models/lessonModel')
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')

// @desc    Fetch all lessons
// @route   GET /api/lessons
// @access  Private/Admin
const getLessons = asyncHandler(async (req, res) => {
  const pageSize = 10
  let page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Lesson.countDocuments({ ...keyword })
  const queryObj = { ...req.query }
  const excludeFields = ['page', 'sort', 'limit', 'fields']
  excludeFields.forEach((el) => delete queryObj[el])
  let queryStr = JSON.stringify(queryObj)
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
  const lessons = await Lesson.find({ ...keyword })
    .find(JSON.parse(queryStr))
    .populate('lecture', 'name')
    .skip(pageSize * (page - 1))
    .limit(pageSize)

  res.json({ lessons, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch a single lesson
// @route   GET /api/lessons/:id
// @access  Private/Admin
const getLessonsById = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id).populate(
    'lecture',
    'name',
  )

  if (lesson) {
    res.json(lesson)
  } else {
    res.status(404)
    throw new Error('Lesson not found')
  }
})

// @desc    Create a single lesson
// @route   POST /api/lessons
// @access  Private/Admin
const createLesson = asyncHandler(async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { lecture, order, title, content } = req.body

  try {
    const newLesson = new Lesson({
      lecture,
      order,
      title,
      content,
    })

    const lesson = await newLesson.save()

    res.json(lesson)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @desc    Delete a single lesson
// @route   DELETE /api/lessons/:id
// @access  Private/Admin
const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id)

  if (lesson) {
    await Lesson.findByIdAndRemove(req.params.id)
    res.json({ message: 'Lesson is removed' })
  } else {
    res.status(404)
    throw new Error('Lesson not found')
  }
})

// @desc    Update a single lessons
// @route   DELETE /api/lessons/:id
// @access  Private/Admin
const updateLesson = asyncHandler(async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { lecture, order, title, content } = req.body

  const lesson = await Lesson.findById(req.params.id)

  if (lesson) {
    lesson.lecture = lecture
    lesson.order = order
    lesson.title = title
    lesson.content = content

    const updateLesson = await lesson.save()
    res.json(updateLesson)
  } else {
    res.status(404)
    throw new Error('Lesson not found')
  }
})

module.exports = {
  getLessons,
  getLessonsById,
  createLesson,
  deleteLesson,
  updateLesson,
}
