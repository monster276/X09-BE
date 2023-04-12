const StudentAttendances = require("../models/attendancesModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

// @desc    Fetch all students attendances
// @route   GET /api/attendances
// @access  Private/Teacher
const getStudentsAttendances = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            student: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            classroom: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const queryObj = { ...req.query };

  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const count = await StudentAttendances.countDocuments({ ...keyword });

  const studentsAttendances = await StudentAttendances.find({ ...keyword })
    .sort({ createAt: -1 })
    .find(req.query)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("student", "fullName")
    .populate("classroom", "name");
  res.json({ studentsAttendances, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single student attendances
// @route   GET /api/attendances/:id
// @access  Private/Teacher
const getStudentAttendancesById = asyncHandler(async (req, res) => {
  const studentAttendances = await StudentAttendances.findById(req.params.id)
    .populate("student", "fullName")
    .populate("classroom", "name");

  if (studentAttendances) {
    res.json(studentAttendances);
  } else {
    res.status(404);
    throw new Error("Attendance not found");
  }
});

// @desc    Create a single student attendances
// @route   POST /api/attendances
// @access  Private/Teacher
const createStudentAttendances = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { student, classroom } = req.body;

  try {
    const newStudentAttendances = new StudentAttendances({
      student,
      classroom,
    });

    const studentAttendances = await newStudentAttendances.save();

    res.json(studentAttendances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc    Create new attendances
// @route   POST /api/attendances/:id/attendance
// @access  Private/Teacher
const createAttendances = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { lesson, presence, score, comment } = req.body;

  const studentAttendances = await StudentAttendances.findById(req.params.id);

  if (studentAttendances) {
    const attendance = {
      lesson,
      presence,
      score,
      comment,
    };

    studentAttendances.attendances.push(attendance);

    await studentAttendances.save();

    res.status(201).json({ message: "attendance added" });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

// @desc    Delete a single student attendances
// @route   DELETE /api/attendances/:id
// @access  Private/Teacher
const deleteStudentAttendances = asyncHandler(async (req, res) => {
  const studentAttendances = await StudentAttendances.findById(req.params.id);

  if (studentAttendances) {
    await StudentAttendances.findByIdAndRemove(req.params.id);
    res.json({ message: "Student Attendances removed" });
  } else {
    res.status(404);
    throw new Error("Student Attendances is not found");
  }
});

// @desc    Update a single student attendances
// @route   PUT /api/attendances/:id
// @access  Private/Teacher
const updateStudentAttendances = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { student, classroom } = req.body;

  const studentAttendances = await StudentAttendances.findById(req.params.id);

  if (studentAttendances) {
    studentAttendances.student = student;
    studentAttendances.classroom = classroom;

    const updateStudentAttendances = await studentAttendances.save();
    res.json(updateStudentAttendances);
  } else {
    res.status(404);
    throw new Error("Student Attendances not found");
  }
});

module.exports = {
  getStudentsAttendances,
  getStudentAttendancesById,
  createStudentAttendances,
  createAttendances,
  deleteStudentAttendances,
  updateStudentAttendances,
};
