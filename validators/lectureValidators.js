const { body } = require("express-validator");

const lectureValidators = [
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
];

module.exports = lectureValidators;
