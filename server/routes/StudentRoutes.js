const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, studentNewProject, getAllGuide } = require('../controller/StudentController')

const{verifyToken} = require('../middleware/AuthMiddleware');
const { getAllStudents } = require('../controller/AdminController');

router.get('/projects', verifyToken,getProjects);
router.get('/projects/:id', verifyToken,getProjectById);
router.post('/project',verifyToken, studentNewProject);
router.get('/faculties',verifyToken, getAllGuide);
router.get('/students',verifyToken,getAllStudents);


module.exports = router;