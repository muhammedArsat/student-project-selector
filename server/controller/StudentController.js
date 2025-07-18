const RegisteredProject = require("../model/RegisteredProject");
const Project = require("../model/Project");
const User = require("../model/User");

const getProjects = async (req, res) => {
  try {
    const { category } = req.query;

    const projects =
      category === "Software"
        ? await Project.find({
            category,
            $expr: { $lt: ["$totalRegistered", "$limit"] },
          })
        : await Project.find({
            category,
            $expr: { $lt: ["$totalRegistered", "$limit"] },
          });
    return res.status(200).json({
      ok: true,
      projects: projects,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const studentNewProject = async (req, res) => {
  try {
    const { students, guide, abstract, project, type, domain, category } =
      req.body;

    if (type === "External") {
      const newExternalProject = new Project({
        title: project,
        domain: domain,
        limit: 1,
        totalRegistered: 1,
        category,
      });
      await newExternalProject.save();
    }
    const projectDetails =
      type === "External"
        ? await Project.findOne({ title: project })
        : await Project.findById(project);

    if (!projectDetails) {
      return res.status(400).json({
        ok: false,
        message: "Project isn't existed",
      });
    }

    const studentDocs = await User.find({ _id: { $in: students } });
    const isAnyOneAlreadyRegistered = studentDocs.find(
      (student) => student.isRegistered === true
    );

    if (isAnyOneAlreadyRegistered) {
      return res.status(200).json({
        ok: "clientError",
        message: "Any one of the student Already registered",
      });
    }

    await User.updateMany(
      { _id: { $in: students } },
      { $set: { isRegistered: true } }
    );

    const newRegisteredProject = new RegisteredProject({
      project: projectDetails._id,
      students,
      guideId: guide,
      abstract,
    });
    const guideDetail = await User.findById(guide);
    console.log(guideDetail)
  
    console.log(projectDetails);
    projectDetails.totalRegistered += 1;
    await projectDetails.save();

    await newRegisteredProject.save();

    return res.status(200).json({
      ok: true,
      message: "Project Registered",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await RegisteredProject.find({ students: id })
      .populate("students")
      .populate("guideId")
      .populate("project");
    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "The student doesn't registered Project",
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

const getAllGuide = async (req, res) => {
  try {
    const guides = await User.find({
      role: "FACULTY",
      limit: { $lte: 3 },
    });

    if (!guides) {
      return res.status(400).json({
        ok: false,
        message: "No guides are free",
      });
    }

    return res.status(200).json({
      ok: true,
      guides: guides,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};
module.exports = {
  getProjects,
  getProjectById,
  studentNewProject,
  getAllGuide,
};
