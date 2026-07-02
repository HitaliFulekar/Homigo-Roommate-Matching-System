const express = require("express");
const router = express.Router();
const Student = require("../models/Student"); // ✅ required

// LOGIN
router.post("/login", async (req, res) => {
  try {
    let { regNo, password, role } = req.body;

    console.log("Login request:", req.body);

    // 🔥 sanitize input
    regNo = regNo?.trim();
    password = password?.trim();

    // ✅ ADMIN LOGIN
    if (role === "admin") {
      if (regNo === "admin" && password === "admin") {
        return res.json({ role: "admin" });
      } else {
        return res.status(401).json({ error: "Invalid admin credentials" });
      }
    }

    // ✅ VALIDATION
    if (!regNo || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    // ✅ FIND STUDENT (STRING MATCH)
    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(401).json({ error: "Student not found" });
    }

    // ✅ PASSWORD CHECK
    if (student.password.trim() !== password) {
      return res.status(401).json({ error: "Invalid regNo or password" });
    }

    // ✅ SUCCESS
    return res.json({
      role: "student",
      regNo: student.regNo
    });

  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET STUDENT DETAILS
router.get("/student/:regNo", async (req, res) => {
  try {
    const { regNo } = req.params;

    const student = await require("../models/Student").findOne({ regNo });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      name: student.name,
      branch: student.branch,
      year: student.year,
      homeState: student.homeState
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;