const express = require("express");
const router = express.Router();
const lessonValidators = require("../validators/lessonValidators");

const {
  getLessons,
  getLessonsById,
  createLesson,
  deleteLesson,
  updateLesson,
} = require("../controllers/lessonController");

router.get("/", getLessons);
router.get("/:id", getLessonsById);
router.post("/", lessonValidators, createLesson);
router.delete("/:id", deleteLesson);
router.put("/:id", lessonValidators, updateLesson);

module.exports = router;
