const express = require("express");
const router = express.Router();
const {
  getClassrooms,
  getClassroomById,
  createClassroom,
  deleteClassroom,
  updateClassroom,
} = require("../controllers/classroomController");

router.get("/", getClassrooms);
router.get("/:id", getClassroomById);
router.post("/", createClassroom);
router.delete("/:id", deleteClassroom);
router.put("/:id", updateClassroom);

module.exports = router;
