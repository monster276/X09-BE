const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.delete("/:id", deleteCourse);
router.put("/:id", updateCourse);

module.exports = router;
