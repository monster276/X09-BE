const { body } = require("express-validator");

const studentAttendance = [
  body("student").not().isEmpty().withMessage("student can not be empty!"),
  body("classroom").not().isEmpty().withMessage("classroom can not be empty!"),
];

const attendances = [
  body("lesson")
    .isDate()
    .withMessage("lesson is date type")
    .not()
    .isEmpty()
    .withMessage("lesson can not be empty!"),
  body("presence")
    .isNumeric()
    .withMessage("presence is number type")
    .not()
    .isEmpty()
    .withMessage("presence can not be empty!"),
  body("score")
    .isNumeric()
    .withMessage("score is number type")
    .not()
    .isEmpty()
    .withMessage("score can not be empty!"),
  body("comment").isString().withMessage("comment is string type"),
];

module.exports = { studentAttendance, attendances };
