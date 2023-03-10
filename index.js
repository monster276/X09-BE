require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { connectToDB } = require('./config/db')
const multer = require('multer')

const path = require('path')
const app = express()
const port = process.env.PORT || 5000

app.use(cors('*'))
app.use(express.json())


///Connect Mongo
connectToDB()
app.listen(port, () => {
  console.log(`back end is running on port: ${port}`)
})
