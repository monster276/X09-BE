const Course = require("../models/courseModel");

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Private/Admin
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Private/Admin
const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
};

// @desc    Create a Course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  const {
    name,
    description,
    courseTime,
    classTime,
    maxNumberOfStudents,
    price,
  } = req.body;

  try {
    const newCourse = new Course({
      name,
      description,
      courseTime,
      classTime,
      maxNumberOfStudents,
      price,
    });

    const course = await newCourse.save();

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
};
