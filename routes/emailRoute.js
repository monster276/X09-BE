const express = require('express')
const router = express.Router()
const sendEmail = require('../utils/sendEmail')

router.post('/', sendEmail)
module.exports = router
