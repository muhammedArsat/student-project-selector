const RegisteredProject = require("../model/RegisteredProject");
const User = require("../model/User");

const getRegisteredProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await RegisteredProject.findById(id);
    if (!project) {
      return res.status(400).json({
        ok: false,
        message: "Project isn't existed",
      });
    }

    return res.status(200).json({
      ok: true,
      project: project,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const guideApproval = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.query;

    const project = await RegisteredProject.findById(id);
    const guideDetails =await User.findById(project.guideId);

    if (!project) {
      return res.status(400).json({
        ok: false,
        message: "Project isn't existed",
      });
    }

    project.guideApproval = status ? "Approved" : "Rejected";
    await project.save();
    if(project.guideApproval === "Approved"){
      guideDetails.limit += 1;
      await guideDetails.save()
    }
    return res.status(200).json({
      ok: true,
      message: `Guide approval Changed to ${project.guideApproval}`,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const { guideId } = req.params;
    const students = await RegisteredProject.find({ guideId: guideId }).select(
      "students"
    );
    if (!students) {
      return res.status(200).json({
        ok: false,
        message: "No students alloted",
      });
    }

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

const getPendingProjects = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const pendingProjects = await RegisteredProject.find({
      guideId: id,
      guideApproval: "Initiated",
    })
      .populate("students")
      .populate("guideId")
      .populate("project");

    if (!pendingProjects) {
      return res.status(200).json({
        ok: true,
        pendingProjects: [""],
      });
    }

    return res.status(200).json({
      ok: true,
      pendingProjects: pendingProjects,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const facultyDashboard = async (req, res) => {
  try {
    const { id } = req.params;
    const facultyProject = await RegisteredProject.find({guideId:id, guideApproval:"Approved"})
      .populate("students")
      .populate("project")
      .populate("guideId");
    if (!facultyProject) {
      return res.status(200).json({
        ok: false,
        facultyProject: [""],
      });
    }
    return res.status(200).json({
      ok: true,
      facultyProject: facultyProject,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};
module.exports = {
  getRegisteredProjectById,
  guideApproval,
  getAllStudents,
  getPendingProjects,
  facultyDashboard,
};
