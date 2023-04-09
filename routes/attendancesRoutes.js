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
router.post(
  "/",
  body("student", "student is required").not().isEmpty(),
  body("classroom", "classroom is required").not().isEmpty(),
  createAttendances
);
router.post(
  "/:id/attendance",
  body("lesson", "lesson is date, lesson is required").isDate().not().isEmpty(),
  body("presence", "presence is number, presence is required")
    .isNumeric()
    .not()
    .isEmpty(),
  body("score", "score is number, score is required")
    .isNumeric()
    .not()
    .isEmpty(),
  body("comment", "comment is string, comment is required")
    .isString()
    .not()
    .isEmpty(),
  createStudentAttendance
);
router.delete("/:id", deleteAttendances);
router.put(
  "/:id",
  body("student", "student is required").not().isEmpty(),
  body("classroom", "classroom is required").not().isEmpty(),
  updateAttendances
);

module.exports = router;
