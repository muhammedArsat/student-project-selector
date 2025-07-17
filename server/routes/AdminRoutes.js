const express = require("express");
const routes = express.Router();
const {
  addNewProject,
  getAllStudents,
  getAllFaculty,
  getFacultyById,
  tacApproval,
  getAllRegisteredProject,
  getRegisteredProjectById,
  getPendingProjects,
} = require("../controller/AdminController");
const {
  verifyAdminToken,
  verifyOfficials,
} = require("../middleware/AuthMiddleware");

routes.post("/projects", verifyAdminToken, addNewProject);

routes.get("/students", verifyAdminToken, getAllStudents);

routes.get("/faculties", verifyAdminToken, getAllFaculty);

routes.get("/faculties/:id", verifyAdminToken, getFacultyById);

routes.put("/projects/:id", verifyAdminToken, tacApproval);

routes.get("/projects", verifyAdminToken, getAllRegisteredProject);

routes.get("/projects/:id", verifyOfficials, getRegisteredProjectById);
routes.get("/pending", verifyAdminToken, getPendingProjects);

module.exports = routes;
