const enrollCourse = require('../models/enrollCourse')
const Locations = require('../models/locationModel')
const Course = require('../models/courseModel')
const { validationResult } = require('express-validator')
const { query } = require('express')
const sendEmail = require('../utils/sendEmail')
const Location = require('../models/locationModel')
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
      const CoureName = await Course.findById(enrollCourseNew.course)
      const LocationName = await Location.findById(enrollCourseNew.location)
      sendEmail(
        enrollCourseNew.email,
        CoureName.name,
        LocationName.name,
        enrollCourseNew.fullName
      )
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
          fullName: {
            $regex: req.query.keyword,
            $options: 'i',
          },
          email: {
            $regex: req.query.keyword,
            $options: 'i',
          },
          phoneNumber: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}

    const queryObj = { ...req.query }
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach((el) => delete queryObj[el])
    const count = await enrollCourse.countDocuments({})
    const enrollCourses = await enrollCourse
      .find({ ...keyword })
      .find(req.query)
      .find({ status: '1' })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('location', 'name ')
      .populate('course', 'name ')
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
