const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
  },
  isAdmin: {
    type: Boolean,
    require: true,
  },
})
module.exports = mongoose.model('User', UserSchema)
