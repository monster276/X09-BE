const express = require("express");
const router = express.Router();
const {
  studentAttendance,
  attendances,
} = require("../validators/attendancesValidators");

const {
  getStudentsAttendances,
  getStudentAttendancesById,
  createStudentAttendances,
  createAttendances,
  updateAttendances,
  deleteStudentAttendances,
  updateStudentAttendances,
} = require("../controllers/attendancesController");

router.get("/", getStudentsAttendances);
router.get("/:id", getStudentAttendancesById);
router.post("/", studentAttendance, createStudentAttendances);
router.post("/:id/attendance", attendances, createAttendances);
router.put("/:id/attendance/:index", attendances, updateAttendances);
router.delete("/:id", deleteStudentAttendances);
router.put("/:id", studentAttendance, updateStudentAttendances);

module.exports = router;
