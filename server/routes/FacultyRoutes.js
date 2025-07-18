const express = require("express");
const router = express.Router();
const { verifyFacultyToken } = require("../middleware/AuthMiddleware");
const { guideApproval, getPendingProjects, facultyDashboard } = require("../controller/FacultyController");
const {
  getAllStudents,
  getRegisteredProjectById,
} = require("../controller/AdminController");
const { route } = require("./AuthRoutes");

router.put("/project/:id", verifyFacultyToken, guideApproval);
router.get("/student/:id", verifyFacultyToken, getAllStudents);
router.get("/project/:id", verifyFacultyToken, getRegisteredProjectById);
router.get('/pending/:id',verifyFacultyToken,getPendingProjects)
router.get('/dashboard/:id',verifyFacultyToken,facultyDashboard)


module.exports = router;