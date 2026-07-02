const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Preference = require("../models/Preferences"); // ✅ FIXED
const generateMatches = require("../ai/match");

// 🔥 RUN MATCHING
router.post("/run", async (req, res) => {
  try {
    
    const prefs = await Preference.find();
console.log("PREFS:", prefs);
    if (prefs.length === 0) {
      return res.json({ message: "No preferences found", unmatched: [] });
    }

    const finalMatches = generateMatches(prefs);
console.log("MATCHES:", finalMatches);

    const used = new Set();

    // CLEAR OLD MATCHES
    await Student.updateMany({}, { $unset: { matchedWith: "" } });

    // SAVE MATCHES
for (let m of finalMatches) {
  used.add(m.student1);
  used.add(m.student2);

  const r1 = await Student.findOneAndUpdate(
    { regNo: String(m.student1) },
    { $set: { matchedWith: String(m.student2) } },
    { new: true }
  );

  const r2 = await Student.findOneAndUpdate(
    { regNo: String(m.student2) },
    { $set: { matchedWith: String(m.student1) } },
    { new: true }
  );

  console.log("Updated1:", r1);
  console.log("Updated2:", r2);
}
    // FIND UNMATCHED
    const allRegs = (await Student.find()).map(s => s.regNo);

    const unmatched = allRegs.filter(reg => !used.has(reg));

    for (let reg of unmatched) {
      await Student.updateOne(
        { regNo: reg },
        { matchedWith: null }
      );
    }

    res.json({
      message: "Matching complete",
      matches: finalMatches,
      unmatched
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL MATCHES (REQUIRED FOR UI)
router.get("/all", async (req, res) => {
  try {
    const students = await Student.find();

    let matches = [];
    let unmatched = [];
    let visited = new Set();

    for (let s of students) {
      if (visited.has(s.regNo)) continue;

      if (s.matchedWith) {
        matches.push({
          student1: s.regNo,
          student2: s.matchedWith
        });

        visited.add(s.regNo);
        visited.add(s.matchedWith);
      } else {
        unmatched.push(s.regNo);
      }
    }

    res.json({ matches, unmatched });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET MATCH FOR ONE STUDENT
router.get("/:regNo", async (req, res) => {
  try {
    const regNo = String(req.params.regNo).trim();

    const student = await Student.findOne({ regNo });

    console.log("FETCHING MATCH FOR:", regNo);
    console.log("STUDENT:", student);

    if (!student || !student.matchedWith) {
      return res.json(null);
    }

    const partner = await Student.findOne({
      regNo: student.matchedWith
    });

    res.json({
      you: student.regNo,
      roommate: partner?.regNo || "Not found"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;