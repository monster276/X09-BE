const Classroom = require("../models/classroomModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

// @desc    Fetch all classrooms
// @route   GET /api/classrooms
// @access  Private/Admin
const getClassrooms = asyncHandler(async (req, res) => {
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

  const count = await Classroom.countDocuments({ ...keyword });
  const classrooms = await Classroom.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ classrooms, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single classroom
// @route   GET /api/classrooms/:id
// @access  Private/Admin
const getClassroomById = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);

  if (classroom) {
    res.json(classroom);
  } else {
    res.status(404);
    throw new Error("Classroom not found");
  }
});

// @desc    Create a single classroom
// @route   POST /api/classrooms
// @access  Private/Admin
const createClassroom = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
    schedule,
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
      schedule,
    });

    // let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      secure: false,
      auth: {
        user: "f3f5246b8879fc",
        pass: "669c1065441968",
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "trunghieu0451@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    const classroom = await newClassroom.save();

    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc    Delete a single classroom
// @route   DELETE /api/classroom/:id
// @access  Private/Admin
const deleteClassroom = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);

  if (classroom) {
    await Classroom.findByIdAndDelete(req.params.id);
    res.json({ message: "Classroom removed" });
  } else {
    res.status(404);
    throw new Error("Classroom not found");
  }
});

// @desc    Update a single classroom
// @route   PUT /api/classrooms/:id
// @access  Private/Admin
const updateClassroom = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
});

module.exports = {
  getClassrooms,
  getClassroomById,
  createClassroom,
  deleteClassroom,
  updateClassroom,
};
