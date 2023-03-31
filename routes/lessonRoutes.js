const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getLessons,
  getLessonsById,
  createLesson,
  deleteLesson,
  updateLesson,
} = require("../controllers/lessonController");

router.get("/", getLessons);
router.get("/:id", getLessonsById);
router.post(
  "/",
  body("lecture", "lecture is string, lesson is required")
    .isString()
    .not()
    .isEmpty(),
  body("order", "order is number").isNumeric(),
  body("title", "title is string, title is required")
    .isString()
    .not()
    .isEmpty(),
  body("content", "content is string").isString(),
  createLesson
);
router.delete("/:id", deleteLesson);
router.put(
  "/:id",
  body("lecture", "lecture is string, lesson is required")
    .isString()
    .not()
    .isEmpty(),
  body("order", "order is number").isNumeric(),
  body("title", "title is string, title is required")
    .isString()
    .not()
    .isEmpty(),
  body("content", "content is string").isString(),
  updateLesson
);

module.exports = router;
