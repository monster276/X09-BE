const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const {
  getLocations,
  getLocationById,
  createLocation,
  deleteLocation,
  updateLocation,
} = require("../controllers/locationController");

router.get("/", verifyTokenAndUserAuthorization, getLocations);
router.get("/:id", verifyTokenAndUserAuthorization, getLocationById);
router.post(
  "/",
  verifyTokenAndUserAuthorization,
  body("id", "ID is string and ID is required, ID length must be less than 5")
    .isLength({ max: 5 })
    .isString()
    .not()
    .isEmpty(),
  body("name", "Name is string and Name is required")
    .isString()
    .not()
    .isEmpty(),
  body("address", "Address is string and Address is required")
    .isString()
    .not()
    .isEmpty(),
  body("status", "Status is boolean and Status is required")
    .isBoolean()
    .not()
    .isEmpty(),
  createLocation
);
router.delete("/:id", verifyTokenAndUserAuthorization, deleteLocation);
router.put(
  "/:id",
  verifyTokenAndUserAuthorization,
  body("id", "ID is string and ID is required, ID length must be less than 5")
    .isLength({ max: 5 })
    .isString()
    .not()
    .isEmpty(),
  body("name", "Name is string and Name is required")
    .isString()
    .not()
    .isEmpty(),
  body("address", "Address is string and Address is required")
    .isString()
    .not()
    .isEmpty(),
  body("status", "Status is boolean and Status is required")
    .isBoolean()
    .not()
    .isEmpty(),
  updateLocation
);

module.exports = router;
