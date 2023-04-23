const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

// @desc    Fetch all students
// @route   GET /api/students
// @access  Private/Admin
const getStudents = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        fullName: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Student.countDocuments({ ...keyword });
  const students = await Student.find({ ...keyword })
    .sort({ createAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ students, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single student
// @route   GET /api/students/:id
// @access  Private/Admin
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

// @desc    Create a single student
// @route   POST /api/student
// @access  Private/Admin
const createStudent = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { classroom, fullName, email, phoneNumber } = req.body;

  try {
    const newStudent = new Student({
      classroom,
      fullName,
      email,
      phoneNumber,
    });

    const student = await newStudent.save();

    res.json(student);
  } catch (error) {
    console.error(err.message);
    res.status(400).json("Student is already exist");
  }
});

// @desc    Delete a single student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await Student.findByIdAndRemove(req.params.id);
    res.json({ message: "Student is removed" });
  } else {
    res.status(404);
    throw new Error("Student is not found");
  }
});

// @desc    Update a single student
// @route   PUT /api/students/:id
// @access  Private/Admin
const updateStudent = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { classroom, fullName, email, phoneNumber } = req.body;

  const student = await Student.findById(req.params.id);

  if (student) {
    student.classroom = classroom;
    student.fullName = fullName;
    student.email = email;
    student.phoneNumber = phoneNumber;

    const updateStudent = await student.save();
    res.json(updateStudent);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
};
