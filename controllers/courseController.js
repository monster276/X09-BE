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

// @desc    Fetch a single course
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

// @desc    Create a single Course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  const {
    name,
    description,
    image,
    courseTime,
    classTime,
    maxNumberOfStudents,
    price,
  } = req.body;

  try {
    const newCourse = new Course({
      name,
      description,
      image,
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

// @desc    Delete a single Course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await Course.findByIdAndRemove(req.params.id);
    res.json({ message: "Course removed" });
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
};

// @desc    Update a single Course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
  const {
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
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
};
