const express = require("express");
const router = express.Router();
const locationValidators = require("../validators/locationValidators");

const {
  getLocations,
  getLocationById,
  createLocation,
  deleteLocation,
  updateLocation,
} = require("../controllers/locationController");

router.get("/", getLocations);
router.get("/:id", getLocationById);
router.post("/", locationValidators, createLocation);
router.delete("/:id", deleteLocation);
router.put("/:id", locationValidators, updateLocation);

module.exports = router;
