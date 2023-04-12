const { body } = require("express-validator");

const classroomValidators = [
  body("id")
    .isString()
    .withMessage("id is string type")
    .not()
    .isEmpty()
    .withMessage("id can not be empty!"),
  body("user")
    .isString()
    .withMessage("user is string type")
    .not()
    .isEmpty()
    .withMessage("user can not be empty!"),
  body("location")
    .isString()
    .withMessage("location is string type")
    .not()
    .isEmpty()
    .withMessage("location can not be empty!"),
  body("course")
    .isString()
    .withMessage("course is string type")
    .not()
    .isEmpty()
    .withMessage("course can not be empty!"),
  body("name")
    .isString()
    .withMessage("name is string type")
    .not()
    .isEmpty()
    .withMessage("name can not be empty!"),
  body("startTime")
    .isDate()
    .withMessage("startTime is date type")
    .not()
    .isEmpty()
    .withMessage("startTime can not be empty!"),
  body("endTime", "End Time is date, End Time is required")
    .isDate()
    .withMessage("endTime is date type")
    .not()
    .isEmpty()
    .withMessage("endTime can not be empty!"),
  body("numberOfLessons", "Number Of Lessons is number, User is required")
    .isNumeric()
    .withMessage("numberOfLessons is number type")
    .not()
    .isEmpty()
    .withMessage("numberOfLessons can not be empty!"),
  body("classTime", "Class Time is number, Class Time is required")
    .isNumeric()
    .withMessage("classTime is number type")
    .not()
    .isEmpty()
    .withMessage("classTime can not be empty!"),
  body("schedule", "Schedule is array, Schedule is required")
    .isArray()
    .withMessage("schedule is array type")
    .not()
    .isEmpty()
    .withMessage("schedule can not be empty!"),
];

module.exports = classroomValidators;