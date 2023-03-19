const Lecture = require("../models/lectureModel");

// @desc    Fetch all lectures
// @route   GET /api/lectures
// @access  Private/Admin
const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({});
    res.json(lectures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Fetch a single lectures
// @route   GET /api/lectures/:id
// @access  Private/Admin
const getLecturesById = async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    res.json(lecture);
  } else {
    res.status(404);
    throw new Error("Lecture not found");
  }
};

// @desc    Create a single lecture
// @route   POST /api/lectures
// @access  Private/Admin
const createLecture = async (req, res) => {
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
};

// @desc    Delete a single lecture
// @route   DELETE /api/lectures/:id
// @access  Private/Admin
const deleteLecture = async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    await Lecture.findByIdAndRemove(req.params.id);
    res.json({ message: "Lecture is removed" });
  } else {
    res.status(404);
    throw new Error("Lecture not found");
  }
};

// @desc    Update a single lectures
// @route   DELETE /api/lectures/:id
// @access  Private/Admin
const updateLecture = async (req, res) => {
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
};

module.exports = {
  getLectures,
  getLecturesById,
  createLecture,
  deleteLecture,
  updateLecture,
};
