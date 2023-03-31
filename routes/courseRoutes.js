const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post(
  "/",
  body("id", "ID is string and ID is required").isString().not().isEmpty(),
  body("name", "Name is string and Name is required")
    .isString()
    .not()
    .isEmpty(),
  body("description", "Description is string and Description is required")
    .isString()
    .not()
    .isEmpty(),
  body("image", "Image is string and Image is required")
    .isString()
    .not()
    .isEmpty(),
  body("courseTime", "Course Time is string and Course Time is required")
    .isString()
    .not()
    .isEmpty(),
  body("classTime", "Class Time is string and Class Time is required")
    .isString()
    .not()
    .isEmpty(),
  body("price", "Price is number and Price is required")
    .isNumeric()
    .not()
    .isEmpty(),
  body(
    "maxNumberOfStudents",
    "Max Number Of Students is number and Max Number Of Students is required"
  )
    .isNumeric()
    .not()
    .isEmpty(),
  createCourse
);
router.delete("/:id", deleteCourse);
router.put(
  "/:id",
  body("id", "ID is string and ID is required").isString().not().isEmpty(),
  body("name", "Name is string and Name is required")
    .isString()
    .not()
    .isEmpty(),
  body("description", "Description is string and Description is required")
    .isString()
    .not()
    .isEmpty(),
  body("image", "Image is string and Image is required")
    .isString()
    .not()
    .isEmpty(),
  body("courseTime", "Course Time is string and Course Time is required")
    .isString()
    .not()
    .isEmpty(),
  body("classTime", "Class Time is string and Class Time is required")
    .isString()
    .not()
    .isEmpty(),
  body("price", "Price is number and Price is required")
    .isNumeric()
    .not()
    .isEmpty(),
  body(
    "maxNumberOfStudents",
    "Max Number Of Students is number and Max Number Of Students is required"
  )
    .isNumeric()
    .not()
    .isEmpty(),
  updateCourse
);

module.exports = router;