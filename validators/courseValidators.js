const { body } = require("express-validator");

const courseValidators = [
  body("id")
    .isString()
    .withMessage("id is string type")
    .not()
    .isEmpty()
    .withMessage("id can not be empty!"),

  body("name")
    .isString()
    .withMessage("name is string type")
    .not()
    .isEmpty()
    .withMessage("name can not be empty!"),

  body("description")
    .isString()
    .withMessage("description is string type")
    .not()
    .isEmpty()
    .withMessage("description can not be empty!"),

  body("courseTime")
    .isString()
    .withMessage("courseTime is string type")
    .not()
    .isEmpty()
    .withMessage("courseTime can not be empty!"),

  body("classTime")
    .isString()
    .withMessage("classTime is string type")
    .not()
    .isEmpty()
    .withMessage("classTime can not be empty!"),

  body("price")
    .isNumeric()
    .withMessage("price is number type")
    .not()
    .isEmpty()
    .withMessage("price can not be empty!"),
  body(
    "maxNumberOfStudents",
    "Max Number Of Students is number and Max Number Of Students is required"
  )
    .isNumeric()
    .not()
    .isEmpty(),
];

module.exports = courseValidators;
