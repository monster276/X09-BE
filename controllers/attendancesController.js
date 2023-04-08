const Attendances = require("../models/attendancesModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

// @desc    Fetch all attendances
// @route   GET /api/attendances
// @access  Private/Teacher
const getAttendances = asyncHandler(async (req, res) => {
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

  const count = await Attendances.countDocuments({ ...keyword });

  const attendances = await Attendances.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ attendances, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single attendance
// @route   GET /api/attendances/:id
// @access  Private/Teacher
const getAttendancesById = asyncHandler(async (req, res) => {
  const attendance = await Attendances.findById(req.params.id);

  if (attendance) {
    res.json(attendance);
  } else {
    res.status(404);
    throw new Error("Attendance not found");
  }
});

// @desc    Create a single attendances
// @route   POST /api/attendances
// @access  Private/Teacher
const createAttendances = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { student, classroom } = req.body;

  try {
    const newAttendances = new Attendances({
      student,
      classroom,
    });

    const attendances = await newAttendances.save();

    res.json(attendances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc    Create new attendance
// @route   POST /api/attendances/:id/attendance
// @access  Private/Teacher
const createStudentAttendance = asyncHandler(async (req, res) => {
  const { lesson, presence, score, comment } = req.body;

  const studentAttendance = await Attendances.findById(req.params.id);

  if (studentAttendance) {
    const attendance = {
      lesson,
      presence,
      score,
      comment,
    };

    studentAttendance.attendances.push(attendance);

    await studentAttendance.save();

    res.status(201).json({ message: "attendance added" });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

// @desc    Delete a single attendances
// @route   DELETE /api/attendances/:id
// @access  Private/Teacher
const deleteAttendances = asyncHandler(async (req, res) => {
  const attendances = await Attendances.findById(req.params.id);

  if (attendances) {
    await Attendances.findByIdAndRemove(req.params.id);
    res.json({ message: "Attendances removed" });
  } else {
    res.status(404);
    throw new Error("Attendances is not found");
  }
});

// @desc    Update a single attendances
// @route   PUT /api/attendances/:id
// @access  Private/Teacher
const updateAttendances = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { student, classroom } = req.body;

  const attendances = await Attendances.findById(req.params.id);

  if (attendances) {
    attendances.student = student;
    attendances.classroom = classroom;

    const updateAttendances = await attendances.save();
    res.json(updateAttendances);
  } else {
    res.status(404);
    throw new Error("Attendances not found");
  }
});

module.exports = {
  getAttendances,
  getAttendancesById,
  createAttendances,
  createStudentAttendance,
  deleteAttendances,
  updateAttendances,
};
