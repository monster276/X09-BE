const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getLectures,
  getLecturesById,
  createLecture,
  deleteLecture,
  updateLecture,
} = require("../controllers/lectureController");

router.get("/", getLectures);
router.get("/:id", getLecturesById);
router.post(
  "/",
  body("course", "Course is string, Course is required")
    .isString()
    .not()
    .isEmpty(),
  body("name", "Name is string, Name is required").isString().not().isEmpty(),
  createLecture
);
router.delete("/:id", deleteLecture);
router.put(
  "/:id",
  body("course", "Course is string, Course is required")
    .isString()
    .not()
    .isEmpty(),
  body("name", "Name is string, Name is required").isString().not().isEmpty(),
  updateLecture
);

module.exports = router;
