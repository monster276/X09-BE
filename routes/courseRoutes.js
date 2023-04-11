const express = require("express");
const router = express.Router();
const courseValidators = require("../validators/courseValidators");

const {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", courseValidators, createCourse);
router.delete("/:id", deleteCourse);
router.put("/:id", courseValidators, updateCourse);

module.exports = router;
