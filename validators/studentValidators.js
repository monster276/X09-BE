const { body } = require("express-validator");

const studentValidators = [
  body("fullName")
    .isString()
    .withMessage("fullName is string type")
    .not()
    .isEmpty()
    .withMessage("fullName can not be empty!"),
  body("email")
    .isEmail()
    .withMessage("fullName is email")
    .not()
    .isEmpty()
    .withMessage("email can not be empty!"),
  body("phoneNumber")
    .isLength({ max: 20 })
    .withMessage("phoneNumber length must be less than 20")
    .isNumeric()
    .withMessage("phoneNumber is number type")
    .not()
    .isEmpty()
    .withMessage("phoneNumber can not be empty!"),
];

module.exports = studentValidators;
