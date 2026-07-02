require("dotenv").config();

const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");

const Student = require("./models/Student");

mongoose.connect(process.env.MONGO_URI);

const students = [];

fs.createReadStream("./models/students.csv")
  .pipe(csv())
  .on("data", (row) => {
    students.push(row);
  })
  .on("end", async () => {
    try {
      await Student.insertMany(students);
      console.log("✅ Students imported successfully");
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });