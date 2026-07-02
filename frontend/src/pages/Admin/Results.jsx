import { useEffect, useState } from "react";
import axios from "axios";

export default function Results() {
  const [matches, setMatches] = useState([]);
  const [unmatched, setUnmatched] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/matching/all");

        setMatches(res.data.matches || []);
        setUnmatched(res.data.unmatched || []);

      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-8">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Roommate Matching Results
      </h1>

      {/* MATCHED SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Matched Pairs
        </h2>

        {matches.length === 0 ? (
          <p className="text-gray-500">No matches yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {matches.map((m, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-blue-200 bg-blue-50 shadow-sm flex justify-between items-center"
              >
                <span className="font-medium text-gray-800">
                  {m.student1}
                </span>

                <span className="text-lg text-blue-600 font-bold">↔</span>

                <span className="font-medium text-gray-800">
                  {m.student2}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UNMATCHED SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Unmatched Students
        </h2>

        {unmatched.length === 0 ? (
          <p className="text-green-600 font-medium">
            Everyone got a roommate 🎉
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {unmatched.map((u, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {u}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}