const Course = require("../models/courseModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const cloudinary = require("../utils/cloudinary");

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Private/Admin
const getCourses = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            id: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Course.countDocuments({ ...keyword });

  const courses = await Course.find({ ...keyword })
    .sort({ createAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ courses, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single course
// @route   GET /api/courses/:id
// @access  Private/Admin
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

// @desc    Create a single Course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    id,
    name,
    description,
    image,
    courseTime,
    classTime,
    maxNumberOfStudents,
    price,
  } = req.body;

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "courseImages",
    });
    const newCourse = new Course({
      id,
      name,
      description,
      image: result.secure_url,
      courseTime,
      classTime,
      maxNumberOfStudents,
      price,
    });

    const course = await newCourse.save();

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: "Course is already exist" });
  }
});

// @desc    Delete a single Course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await Course.findByIdAndRemove(req.params.id);
    res.json({ message: "Course removed" });
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

// @desc    Update a single Course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    id,
    name,
    description,
    image,
    courseTime,
    classTime,
    maxNumberOfStudents,
    price,
  } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    course.id = id;
    course.name = name;
    course.description = description;
    course.image = image;
    course.courseTime = courseTime;
    course.classTime = classTime;
    course.maxNumberOfStudents = maxNumberOfStudents;
    course.price = price;

    const updateCourse = await course.save();
    res.json(updateCourse);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

const getNewCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).sort({ createAt: -1 }).limit(6);

  res.json(courses);
});

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
  getNewCourses,
};
