import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MatchingControl() {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const runMatching = async () => {
    try {
      setStatus("Running matching...");

      const res = await fetch("https://homigo-roommate-matching-system-1.onrender.com/api/matching/run", {
        method: "POST"
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("Error: " + data.error);
        return;
      }

      setStatus("✅ Matching completed");

    } catch (err) {
      console.error(err);
      setStatus("❌ Backend error");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-green-100">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Matching Control
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <button
          onClick={runMatching}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg"
        >
          Run Matching
        </button>

        <button
          onClick={() => navigate("/admin/results")}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
        >
          View Matches
        </button>

        <p className="mt-4 text-gray-700">{status}</p>

      </div>
    </div>
  );
}