const Location = require("../models/LocationModel");
const { validationResult } = require("express-validator");

// @desc    Fetch all locations
// @route   GET /api/locations
// @access  Private/Admin
const getLocations = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Location.countDocuments({ ...keyword });
  const locations = await Location.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ locations, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Fetch a single location
// @route   GET /api/locations/:id
// @access  Private/Admin
const getLocationById = async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (location) {
    res.json(location);
  } else {
    res.status(404);
    throw new Error("Location not found");
  }
};

// @desc    Create a single location
// @route   POST /api/locations
// @access  Private/Admin
const createLocation = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, name, address, status } = req.body;

  try {
    const newLocation = new Location({
      id,
      name,
      address,
      status,
    });

    const location = await newLocation.save();

    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Delete a single location
// @route   DELETE /api/locations/:id
// @access  Private/Admin
const deleteLocation = async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (location) {
    await Location.findByIdAndRemove(req.params.id);
    res.json({ message: "Location removed" });
  } else {
    res.status(404);
    throw new Error("Location is not found");
  }
};

// @desc    Update a single location
// @route   PUT /api/locations/:id
// @access  Private/Admin
const updateLocation = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, name, address, status } = req.body;

  const location = await Location.findById(req.params.id);

  if (location) {
    location.id = id;
    location.name = name;
    location.address = address;
    location.status = status;

    const updateLocation = await location.save();
    res.json(updateLocation);
  } else {
    res.status(404);
    throw new Error("Location not found");
  }
};

module.exports = {
  getLocations,
  getLocationById,
  createLocation,
  deleteLocation,
  updateLocation,
};
