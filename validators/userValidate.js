const { check, validationResult } = require('express-validator')
const user = require('../models/User')
exports.validateUserCreate = [
  check('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Không được bỏ trống!')
    .isString()
    .withMessage('Không đúng định dạng!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Tối thiểu 3 kí tự và tối đa 20 kí tự!')
    .custom(async (username) => {
      const existingUsername = await user.find({ username })
      if (existingUsername) {
        throw new Error('Username đã được sử dụng')
      }
    }),
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Không đúng định dạng email!')
    .custom(async (email) => {
      const existingUserEmail = await user.find({ email })
      if (existingUserEmail) {
        throw new Error('Email đã được sử dụng')
      }
    }),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password không được bỏ trống!')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password từ 8 đến 20 kí tự!'),
]

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array()
  if (!result.length) return next()
  const error = result[0].msg
  res.json({ success: false, message: error })
}

exports.validateUserLogIn = [
  check('email')
    .trim()
    .isEmail()
    .withMessage('Email/ mật khẩu không được bỏ trống'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email/ mật khẩu không được bỏ trống'),
]
