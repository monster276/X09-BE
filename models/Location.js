const mongoose = require('mongoose')
const LocationSchema = new mongoose.Schema({
  idLocation: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  adress: {
    type: String,
    required: true,
  },
  status: {
    type: Object,
    required: true,
  },
})
module.exports = mongoose.model('Location', LocationSchema)
