const express = require("express");
const router = express.Router();
const lectureValidators = require("../validators/lectureValidators");

const {
  getLectures,
  getLecturesById,
  createLecture,
  deleteLecture,
  updateLecture,
} = require("../controllers/lectureController");

router.get("/", getLectures);
router.get("/:id", getLecturesById);
router.post("/", lectureValidators, createLecture);
router.delete("/:id", deleteLecture);
router.put("/:id", lectureValidators, updateLecture);

module.exports = router;
