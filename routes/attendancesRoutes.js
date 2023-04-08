const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
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
router.post("/", createAttendances);
router.post("/:id/attendance", createStudentAttendance);
router.delete("/:id", deleteAttendances);
router.put("/:id", updateAttendances);

module.exports = router;
