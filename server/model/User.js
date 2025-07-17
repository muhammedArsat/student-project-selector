const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default:0
  },
    role: {
        type: String,
        default:"STUDENT"
    },
    profile: {
        type: String,
        default:""
    }
});

module.exports = mongoose.model('User', userSchema);


