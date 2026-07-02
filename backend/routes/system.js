const express = require("express");
const router = express.Router();
const System = require("../models/System");

// GET SETTINGS
router.get("/", async (req, res) => {
  try {
    let settings = await System.findOne();

    if (!settings) {
      settings = new System();
      await settings.save();
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE SETTINGS
router.post("/", async (req, res) => {
  try {
    let settings = await System.findOne();

    if (!settings) {
      settings = new System(req.body);
    } else {
      // 🔥 FIX: update fields manually
      if (req.body.deadline !== undefined)
        settings.deadline = new Date(req.body.deadline);

      if (req.body.submissionsOpen !== undefined)
        settings.submissionsOpen = req.body.submissionsOpen;

      if (req.body.matchingEnabled !== undefined)
        settings.matchingEnabled = req.body.matchingEnabled;
    }

    await settings.save();

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;