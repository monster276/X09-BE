const express = require("express");
const router = express.Router();
const classroomValidators = require("../validators/classroomValidators");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const {
  getClassrooms,
  getMyClassrooms,
  getClassroomById,
  createClassroom,
  deleteClassroom,
  updateClassroom,
} = require("../controllers/classroomController");

router.get("/", getClassrooms);
router.get("/myclassrooms", verifyToken, getMyClassrooms);
router.get("/:id", getClassroomById);
router.post("/", createClassroom);
router.delete("/:id", deleteClassroom);
router.put("/:id", updateClassroom);

module.exports = router;
