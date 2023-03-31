
const enrollCourseController = require('../controllers/enrollCourseController')
const router = require('express').Router()
router.post('/create', enrollCourseController.createEnroll)
router.get('/:id', enrollCourseController.getEnrollCourseById)
router.get('/', enrollCourseController.getListEnroll)

router.delete('/:id', enrollCourseController.deleteEnrollCourse)
module.exports = router
