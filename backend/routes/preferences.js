const express = require("express");
const router = express.Router();
const Preference = require("../models/Preferences");

// ✅ SUBMIT PREFERENCES
router.post("/", async (req, res) => {
  try {

    const {
      regNo,
      diet,
      sleep,
      cleanliness,
      study,
      noise,
      personality,
      knownPeer
    } = req.body;

    if (!regNo) {
      return res.status(400).json({ error: "regNo is required" });
    }

    // check if already exists
    let pref = await Preference.findOne({ regNo });

    if (!pref) {
      pref = new Preference({ regNo });
    }

    pref.diet = diet;
    pref.sleep = sleep;
    pref.cleanliness = cleanliness;
    pref.study = study;
    pref.noise = noise;
    pref.personality = personality;
    pref.knownPeer = knownPeer;

    await pref.save();

    res.json({ message: "Preferences saved", preference: pref });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET ALL SUBMITTED STUDENTS
router.get("/submitted", async (req, res) => {
  try {
    const prefs = await Preference.find({
      $or: [
        { knownPeer: { $exists: true, $ne: "" } },
        { diet: { $exists: true, $ne: "" } },
        { sleep: { $exists: true, $ne: "" } },
        { cleanliness: { $exists: true, $ne: "" } },
        { study: { $exists: true, $ne: "" } },
        { noise: { $exists: true, $ne: "" } },
        { personality: { $exists: true, $ne: "" } }
      ]
    }).select("regNo diet sleep cleanliness study noise personality knownPeer");

    res.json(prefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
