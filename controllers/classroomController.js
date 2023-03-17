const Classroom = require("../models/classroomModel");

// @desc    Fetch all classrooms
// @route   GET /api/classrooms
// @access  Private/Admin
const getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find({});
    res.json(classrooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Fetch a single classroom
// @route   GET /api/classrooms/:id
// @access  Private/Admin
const getClassroomById = async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);

  if (classroom) {
    res.json(classroom);
  } else {
    res.status(404);
    throw new Error("Classroom not found");
  }
};

// @desc    Create a single classroom
// @route   POST /api/classrooms
// @access  Private/Admin
const createClassroom = async (req, res) => {
  const {
    id,
    user,
    location,
    course,
    name,
    startTime,
    endTime,
    numberOfLessons,
    classTime,
  } = req.body;

  try {
    const newClassroom = new Classroom({
      id,
      user,
      location,
      course,
      name,
      startTime,
      endTime,
      numberOfLessons,
      classTime,
    });

    const classroom = await newClassroom.save();

    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Delete a single classroom
// @route   DELETE /api/classroom/:id
// @access  Private/Admin
const deleteClassroom = async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);

  if (classroom) {
    await Classroom.findByIdAndDelete(req.params.id);
    res.json({ message: "Classroom removed" });
  } else {
    res.status(404);
    throw new Error("Classroom not found");
  }
};

// @desc    Update a single classroom
// @route   PUT /api/classrooms/:id
// @access  Private/Admin
const updateClassroom = async (req, res) => {
  const { id, name, course, startTime, endTime, numberOfLessons, classTime } =
    req.body;

  const classroom = await Classroom.findById(req.params.id);

  if (classroom) {
    classroom.id = id;
    classroom.course = course;
    classroom.name = name;
    classroom.startTime = startTime;
    classroom.endTime = endTime;
    classroom.numberOfLessons = numberOfLessons;
    classroom.classTime = classTime;

    const updateClassroom = await classroom.save();
    res.json(updateClassroom);
  } else {
    res.status(404);
    throw new Error("Classroom not found");
  }
};

module.exports = {
  getClassrooms,
  getClassroomById,
  createClassroom,
  deleteClassroom,
  updateClassroom,
};
