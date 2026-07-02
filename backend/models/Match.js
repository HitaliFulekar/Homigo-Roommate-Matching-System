const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  student1: String,
  student2: String,
  score: Number
});

module.exports = mongoose.model("Match", matchSchema);