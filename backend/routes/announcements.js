const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");

// GET
router.get("/", async (req, res) => {
  const data = await Announcement.find().sort({ _id: -1 });
  res.json(data);
});

// POST (admin)
router.post("/", async (req, res) => {
  const { text } = req.body;

  const newItem = new Announcement({
    text,
    time: new Date().toLocaleString()
  });

  await newItem.save();
  res.json(newItem);
});

router.delete("/:id", async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;