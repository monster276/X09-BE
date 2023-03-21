const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getClassrooms,
  getClassroomById,
  createClassroom,
  deleteClassroom,
  updateClassroom,
} = require("../controllers/classroomController");

router.get("/", getClassrooms);
router.get("/:id", getClassroomById);
router.post(
  "/",
  body("id", "ID is number, ID is required").isNumeric().not().isEmpty(),
  body("user", "User is string, User is required").isString().not().isEmpty(),
  body("location", "Location is string, User is required")
    .isString()
    .not()
    .isEmpty(),
  body("course", "Course is string, Course is required")
    .isString()
    .not()
    .isEmpty(),
  body("name", "Name is string, Name is required").isString().not().isEmpty(),
  body("startTime", "Start Time is date, Start Time is required")
    .isDate()
    .not()
    .isEmpty(),
  body("endTime", "End Time is date, End Time is required")
    .isDate()
    .not()
    .isEmpty(),
  body("numberOfLessons", "Number Of Lessons is number, User is required")
    .isNumeric()
    .not()
    .isEmpty(),
  body("classTime", "Class Time is number, Class Time is required")
    .isNumeric()
    .not()
    .isEmpty(),
  body("schedule", "Schedule is array, Schedule is required")
    .isArray()
    .not()
    .isEmpty(),
  createClassroom
);
router.delete("/:id", deleteClassroom);
router.put(
  "/:id",
  body("id", "ID is number, ID is required").isNumeric().not().isEmpty(),
  body("user", "User is string, User is required").isString().not().isEmpty(),
  body("location", "Location is string, User is required")
    .isString()
    .not()
    .isEmpty(),
  body("course", "Course is string, Course is required")
    .isString()
    .not()
    .isEmpty(),
  body("name", "Name is string, Name is required").isString().not().isEmpty(),
  body("startTime", "Start Time is date, Start Time is required")
    .isDate()
    .not()
    .isEmpty(),
  body("endTime", "End Time is date, End Time is required")
    .isDate()
    .not()
    .isEmpty(),
  body("numberOfLessons", "Number Of Lessons is number, User is required")
    .isNumeric()
    .not()
    .isEmpty(),
  body("classTime", "Class Time is number, Class Time is required")
    .isNumeric()
    .not()
    .isEmpty(),
  body("schedule", "Schedule is array, Schedule is required")
    .isArray()
    .not()
    .isEmpty(),
  updateClassroom
);

module.exports = router;
