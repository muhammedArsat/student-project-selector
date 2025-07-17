const mongoose = require("mongoose");

const registeredProjectSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  guideApproval: {
    type: String,
    default: "Initiated",
  },
  tacApproval: {
    type: String,
    default: "Initiated",
  },
  reason: {
    type: String,
    default: "",
  },
  abstract: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RegisteredProject", registeredProjectSchema);
