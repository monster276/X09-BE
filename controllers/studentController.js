const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");

// @desc    Fetch all students
// @route   GET /api/students
// @access  Private/Admin
const getStudents = asyncHandler(async (req, res) => {
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

  const count = await Student.countDocuments({ ...keyword });
  const students = await Student.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ students, page, pages: Math.ceil(count / pageSize) });
});

module.exports = {
  getStudents,
};
