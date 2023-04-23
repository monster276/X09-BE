const authController = require('../controllers/authController')
const {
  validateUserCreate,
  userValidation,
  validateUserLogIn,
} = require('../validators/userValidate')
const router = require('express').Router()
const { verifyToken } = require('../controllers/verifyToken')

//CreateUser
router.post('/create', validateUserCreate, authController.createUser)

//REFRESH TOKEN
router.post('/refresh', authController.requestRefreshToken)
//LOG IN
router.post('/login', authController.loginUser)
//LOG OUT
router.post('/logout', verifyToken, authController.logOut)

module.exports = router
