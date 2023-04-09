const enrollCourse = require('../models/enrollCourse')
const Locations = require('../models/LocationModel')
const { validationResult } = require('express-validator')
const { query } = require('express')
const enrollCourseController = {
  //CREATE ENROLL
  createEnroll: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      console.log('hello')
      const newenrollCoures = await new enrollCourse({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        course: req.body.course,
        status: req.body.status,
      })
      //Save to DB
      const enrollCourseNew = await newenrollCoures.save()
      res.status(200).json(enrollCourseNew)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  //GET ENROLL
  getEnrollCourseById: async (req, res) => {
    const EnrollCourse = await enrollCourse.findById(req.params.id)

    if (EnrollCourse) {
      res.json(EnrollCourse)
    } else {
      res.status(404)
      throw new Error('rollCourse not found')
    }
  },
  //DELETE
  deleteEnrollCourse: async (req, res) => {
    const EnrollCourse = await enrollCourse.findById(req.params.id)
    if (EnrollCourse) {
      await enrollCourse.findByIdAndRemove(req.params.id)
      res.json({ message: 'EnrollCourse removed' })
    } else {
      res.status(404)
      throw new Error('EnrollCourse is not found')
    }
  },
  getListEnroll: async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
    console.log('filter')
    console.log(req.query)
    const queryObj = { ...req.query }
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach((el) => delete queryObj[el])
    console.log(req.query, query)
    const count = await enrollCourse.countDocuments({})
    const enrollCourses = await enrollCourse
      .find(req.query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('location', 'name -_id')
      .populate('course', 'name -_id')
    res.json({
      status: 'done',
      results: enrollCourses.length,
      enrollCourses,
      page,
      pages: Math.ceil(count / pageSize),
    })
  },
}
module.exports = enrollCourseController
