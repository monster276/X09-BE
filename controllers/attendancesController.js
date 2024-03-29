const StudentAttendances = require("../models/attendancesModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

// @desc    Fetch all students attendances
// @route   GET /api/attendances
// @access  Private/Teacher
const getStudentsAttendances = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  // const keyword = req.query.keyword
  //   ? {
  //       $or: [
  //         {
  //           student: {
  //             $regex: req.query.keyword,
  //             $options: "i",
  //           },
  //         },
  //         {
  //           classroom: {
  //             $regex: req.query.keyword,
  //             $options: "i",
  //           },
  //         },
  //       ],
  //     }
  //   : {};

  const count = await StudentAttendances.countDocuments({});

  const studentsAttendances = await StudentAttendances.find(req.query)
    .sort({ createAt: -1 })
    .limit(pageSize)
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
    res.status(400).json({ message: "Student Attendance is already exist" });
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

// @desc    Create new attendances
// @route   POST /api/attendances/:id/attendance
// @access  Private/Teacher
const updateAttendances = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { presence, score, comment } = req.body;

  const studentAttendances = await StudentAttendances.findById(req.params.id);
  const attendance = await studentAttendances.attendances[req.params.index];

  if (studentAttendances) {
    attendance.presence = presence;
    attendance.score = score;
    attendance.comment = comment;

    const updateAttendance = await studentAttendances.save();
    res.json({ updateAttendance });

    res.status(201).json({ message: "attendance updated" });
  } else {
    res.status(404);
    throw new Error("Attendance not found");
  }
});

module.exports = {
  getStudentsAttendances,
  getStudentAttendancesById,
  createStudentAttendances,
  createAttendances,
  updateAttendances,
  deleteStudentAttendances,
  updateStudentAttendances,
};
