const express = require("express");
const router = express.Router();
const classroomValidators = require("../validators/classroomValidators");

const {
  getClassrooms,
  getClassroomById,
  createClassroom,
  deleteClassroom,
  updateClassroom,
} = require("../controllers/classroomController");

router.get("/", getClassrooms);
router.get("/:id", getClassroomById);
router.post("/", classroomValidators, createClassroom);
router.delete("/:id", deleteClassroom);
router.put("/:id", classroomValidators, updateClassroom);

module.exports = router;
