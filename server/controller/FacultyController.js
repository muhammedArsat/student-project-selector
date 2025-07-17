const RegisteredProject = require("../model/RegisteredProject");

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

    if (!project) {
      return res.status(400).json({
        ok: false,
        message: "Project isn't existed",
      });
    }

    project.guideApproval = status ? "Approved" : "Rejected";
    await project.save();

    return res.status(200).json({
      ok: false,
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

module.exports = {
  getRegisteredProjectById,
  guideApproval,
  getAllStudents,
  getPendingProjects,
};
