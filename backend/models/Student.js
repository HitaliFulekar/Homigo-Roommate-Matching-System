const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  name: String,
  branch: String,
  year: String,
  password: String,
  homeState: String,

  matchedWith: { type: String, default: null }  // ✅ ADD THIS
});

module.exports = mongoose.model("Student", studentSchema);