const Lecture = require("../models/lectureModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

// @desc    Fetch all lectures
// @route   GET /api/lectures
// @access  Private/Admin
const getLectures = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Lecture.countDocuments({ ...keyword });
  const lectures = await Lecture.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ lectures, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single lectures
// @route   GET /api/lectures/:id
// @access  Private/Admin
const getLecturesById = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    res.json(lecture);
  } else {
    res.status(404);
    throw new Error("Lecture not found");
  }
});

// @desc    Create a single lecture
// @route   POST /api/lectures
// @access  Private/Admin
const createLecture = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { course, name } = req.body;

  try {
    const newLecture = new Lecture({
      course,
      name,
    });

    const lecture = await newLecture.save();

    res.json(lecture);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc    Delete a single lecture
// @route   DELETE /api/lectures/:id
// @access  Private/Admin
const deleteLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    await Lecture.findByIdAndRemove(req.params.id);
    res.json({ message: "Lecture is removed" });
  } else {
    res.status(404);
    throw new Error("Lecture not found");
  }
});

// @desc    Update a single lectures
// @route   DELETE /api/lectures/:id
// @access  Private/Admin
const updateLecture = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { course, name } = req.body;

  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    lecture.course = course;
    lecture.name = name;

    const updateLecture = await lecture.save();
    res.json(updateLecture);
  } else {
    res.status(404);
    throw new Error("Lecture not found");
  }
});

module.exports = {
  getLectures,
  getLecturesById,
  createLecture,
  deleteLecture,
  updateLecture,
};
