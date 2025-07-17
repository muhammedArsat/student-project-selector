const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    default: 0,
  },
  totalRegistered:{
    type:Number,
    default:0
  }
});

module.exports = mongoose.model("Project", projectSchema);
