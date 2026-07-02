function generateMatches(students) {
  let directPairs = [];
  let used = new Set();

  // 🔥 STEP 1: HANDLE KNOWN PEER (OVERRIDE MODE)
  students.forEach(s => {
    if (
      s.knownPeer &&
      s.knownPeer.trim() !== "" &&
      !used.has(s.regNo)
    ) {
      const partner = students.find(
        p => String(p.regNo) === String(s.knownPeer)
      );

      if (partner && !used.has(partner.regNo)) {
        directPairs.push({
          student1: s.regNo,
          student2: partner.regNo,
          score: 100
        });

        used.add(s.regNo);
        used.add(partner.regNo);
      }
    }
  });

  // 🔥 STEP 2: REMAINING STUDENTS
  const remaining = students.filter(
    s => !used.has(s.regNo)
  );

  let matches = [];

  for (let i = 0; i < remaining.length; i++) {
    for (let j = i + 1; j < remaining.length; j++) {
      let score = 0;

      // ✅ IGNORE EMPTY VALUES
      if (remaining[i].diet && remaining[i].diet === remaining[j].diet) score++;
      if (remaining[i].sleep && remaining[i].sleep === remaining[j].sleep) score++;
      if (remaining[i].cleanliness && remaining[i].cleanliness === remaining[j].cleanliness) score++;
      if (remaining[i].study && remaining[i].study === remaining[j].study) score++;
      if (remaining[i].noise && remaining[i].noise === remaining[j].noise) score++;

      matches.push({
        student1: remaining[i].regNo,
        student2: remaining[j].regNo,
        score
      });
    }
  }

  // 🔥 STEP 3: SORT
  matches.sort((a, b) => b.score - a.score);

  // 🔥 STEP 4: UNIQUE MATCHING
  let finalMatches = [...directPairs];

  for (let m of matches) {
    if (!used.has(m.student1) && !used.has(m.student2)) {
      finalMatches.push(m);
      used.add(m.student1);
      used.add(m.student2);
    }
  }

  return finalMatches;
}

module.exports = generateMatches;