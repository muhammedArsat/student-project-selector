const Project = require("../model/Project");
const RegisteredProject = require("../model/RegisteredProject");
const User = require("../model/User");

//localhost:3000/api/v1/projects (POST)
const addNewProject = async (req, res) => {
  try {
    const { title, domain, category, limit } = req.body;
    const newProject = new Project({
      title: title,
      domain: domain,
      category: category,
      limit: limit,
    });
    await newProject.save();
    return res.status(201).json({
      ok: true,
      message: `New ${category} Project is created`,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "STUDENT" });
    return res.status(200).json({
      ok: true,
      students: students,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getAllFaculty = async (req, res) => {
  try {
    const faculty = await User.find({ role: "FACULTY" });
    return res.status(200).json({
      ok: true,
      faculty: faculty,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await User.findById(id);
    if (!faculty) {
      return res.status(400).json({
        ok: false,
        message: "Faculty not Existed",
      });
    }

    return res.status(200).json({
      ok: true,
      faculty: faculty,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const tacApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const registeredProject = await RegisteredProject.findById(id);

    if (!registeredProject) {
      return res.status(400).json({
        ok: false,
        message: "Project isn't exists",
      });
    }
    if (status) {
      registeredProject.tacApproval = "Approved";
    } else {
      registeredProject.tacApproval = "Rejected";
    }
    await registeredProject.save();
    return res.status(200).json({
      ok: true,
      message: "Tac Approval Status Changed",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getAllRegisteredProject = async (req, res) => {
  try {
    const registeredProjects = await RegisteredProject.find();
    return res.status(200).json({
      ok: true,
      registeredProjects: registeredProjects,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getRegisteredProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const registeredProject = await RegisteredProject.findById(id);

    if (!registeredProject) {
      return res.status(400).json({
        ok: false,
        message: "Project isn't existed",
      });
    }

    return res.status(200).json({
      ok: true,
      registeredProject: registeredProject,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getPendingProjects = async (req, res) => {
  try {
    const pendingProjects = await RegisteredProject.find({
      tacApproval: "Initiated",
      guideApproval: "Approved",
    }).populate('students')
    .populate("guideId").populate('project');

    console.log("Inside Admin Controller")
    if(!pendingProjects){
      return res.status(200).json({
        ok:false,
        message:[""]
      })
    } 
    console.log(pendingProjects)
    return res.status(200).json({
      ok:true,
      pendingProjects: pendingProjects
    })

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};
module.exports = {
  addNewProject,
  getAllStudents,
  getAllFaculty,
  getFacultyById,
  tacApproval,
  getAllRegisteredProject,
  getRegisteredProjectById,
  getPendingProjects
};
