const mongoose = require('mongoose')
const LocationSchema = new mongoose.Schema({
  idLocation: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
    unique: true,
  },
  adress: {
    type: String,
    require: true,
  },
  status: {
    type: Object,
    require: true,
  },
})
module.exports = mongoose.model('Location', LocationSchema)
