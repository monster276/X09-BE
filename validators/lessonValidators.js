const { body } = require("express-validator");

const lessonValidators = [
  body("lecture")
    .isString()
    .withMessage("lecture is string type")
    .not()
    .isEmpty()
    .withMessage("lecture can not be empty!"),
  body("order")
    .isNumeric()
    .withMessage("order is number type")
    .not()
    .isEmpty()
    .withMessage("order can not be empty!"),
  body("title")
    .isString()
    .withMessage("title is string type")
    .not()
    .isEmpty()
    .withMessage("title can not be empty!"),
  body("content").isString().withMessage("content is string type"),
];

module.exports = lessonValidators;
