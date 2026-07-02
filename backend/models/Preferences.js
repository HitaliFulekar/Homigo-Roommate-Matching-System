const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  regNo: { type: String, required: true },

  diet: String,
  sleep: String,
  cleanliness: String,
  study: String,
  noise: String,
  personality: String,

  knownPeer: String,
  matchedWith: String
});

module.exports = mongoose.model("Preference", preferenceSchema);