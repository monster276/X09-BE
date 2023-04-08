const enrollCourse = require('../models/enrollCourse')
const { validationResult } = require('express-validator')
const enrollCourseController = {
  //CREATE ENROLL
  createEnroll: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      console.log('hello')

      //Create new user
      const newenrollCoures = await new enrollCourse({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        locationId: req.body.locationId,
        courseId: req.body.courseId,
        status: req.body.status,
      })

      //Save user to DB
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
  //GET ALL
  getListEnroll: async (req, res) => {
    // try {
    //   const enrollCourses = await enrollCourse.find()
    //   res.status(200).json(enrollCourses)
    // } catch (err) {
    //   res.status(500).json(err)
    // }

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

    const count = await enrollCourse.countDocuments({ ...keyword })
    const enrollCourses = await enrollCourse
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.json({ enrollCourses, page, pages: Math.ceil(count / pageSize) })
  },
}
module.exports = enrollCourseController
