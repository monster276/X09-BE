const { body } = require("express-validator");

const locationValidators = [
  body("id")
    .isLength({ max: 5 })
    .withMessage("id length must be less than 5")
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
  body("address")
    .isString()
    .withMessage("address is string type")
    .not()
    .isEmpty()
    .withMessage("address can not be empty!"),
  body("status")
    .isBoolean()
    .withMessage("status is Boolean type")
    .not()
    .isEmpty()
    .withMessage("status can not be empty!"),
];

module.exports = locationValidators;
