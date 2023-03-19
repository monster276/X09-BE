const express = require("express");
const router = express.Router();
const {
  getLectures,
  getLecturesById,
  createLecture,
  deleteLecture,
  updateLecture,
} = require("../controllers/lectureController");

router.get("/", getLectures);
router.get("/:id", getLecturesById);
router.post("/", createLecture);
router.delete("/:id", deleteLecture);
router.put("/:id", updateLecture);

module.exports = router;
