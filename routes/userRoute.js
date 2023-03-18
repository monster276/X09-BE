const userController = require('../controllers/userController')
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require('../controllers/verifyToken')

const router = require('express').Router()
//GET ALL USERS
router.get('/', verifyToken, userController.getAllUsers)
//GET USER
router.get('/:id', userController.getUser)
//DELETE USER
router.delete(
  '/:id',
  verifyTokenAndUserAuthorization,
  userController.deleteUser,
)
//UPDATE USER
router.put('/:id', userController.updateUser)
module.exports = router
