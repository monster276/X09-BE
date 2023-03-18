const express = require("express");
const router = express.Router();

const {
  getLocations,
  getLocationById,
  createLocation,
  deleteLocation,
  updateLocation,
} = require("../controllers/locationController");

router.get("/", getLocations);
router.get("/:id", getLocationById);
router.post("/", createLocation);
router.delete("/:id", deleteLocation);
router.put("/:id", updateLocation);

module.exports = router;
