const express = require("express");
const router = express.Router();
const studentValidators = require("../validators/studentValidators");

const {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentController");

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", studentValidators, createStudent);
router.delete("/:id", deleteStudent);
router.put("/:id", studentValidators, updateStudent);

module.exports = router;
