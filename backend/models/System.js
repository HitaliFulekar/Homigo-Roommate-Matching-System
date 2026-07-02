const mongoose = require("mongoose");

const systemSchema = new mongoose.Schema({
  deadline: Date,
  submissionsOpen: { type: Boolean, default: true },
  matchingEnabled: { type: Boolean, default: true }
});

module.exports = mongoose.model("System", systemSchema);