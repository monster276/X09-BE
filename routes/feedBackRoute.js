const router = require('express').Router()
const FeedbackController = require('../controllers/FeedbackController')
router.post('/recive', FeedbackController.reciveFeedback)
router.get('/', FeedbackController.getAllFeedback)

module.exports = router
