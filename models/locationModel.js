const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
