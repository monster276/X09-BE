const express = require("express");
const router = express.Router();
const {
  studentAttendance,
  attendances,
} = require("../validators/attendancesValidators");

const {
  getAttendances,
  getAttendancesById,
  createAttendances,
  createStudentAttendance,
  deleteAttendances,
  updateAttendances,
} = require("../controllers/attendancesController");

router.get("/", getAttendances);
router.get("/:id", getAttendancesById);
router.post("/", studentAttendance, createAttendances);
router.post("/:id/attendance", attendances, createStudentAttendance);
router.delete("/:id", deleteAttendances);
router.put("/:id", studentAttendance, updateAttendances);

module.exports = router;
