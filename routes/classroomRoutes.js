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

router.get("/", verifyTokenAndAdmin, getClassrooms);
router.get("/myclassrooms", verifyToken, getMyClassrooms);
router.get("/:id", verifyTokenAndAdmin, getClassroomById);
router.post("/", verifyTokenAndAdmin, classroomValidators, createClassroom);
router.delete("/:id", verifyTokenAndAdmin, deleteClassroom);
router.put("/:id", verifyTokenAndAdmin, classroomValidators, updateClassroom);

module.exports = router;
