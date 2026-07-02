import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PreferenceForm() {
  const [form, setForm] = useState({
    diet: "",
    sleep: "",
    cleanliness: "",
    study: "",
    noise: "",
    personality: "",
    knownPeer: ""
  });

  const [system, setSystem] = useState(null);
  const [hasPeer, setHasPeer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/system?ts=" + Date.now())
      .then(res => res.json())
      .then(data => setSystem(data));
  }, []);

  if (!system) return <h2>Loading...</h2>;

  const deadlinePassed =
    system.deadline && new Date(system.deadline) < new Date();

  const handleSubmit = async () => {
    if (deadlinePassed) {
      alert("Deadline passed");
      return;
    }

    const regNo = localStorage.getItem("regNo");

    // ✅ IMPORTANT CHECK
    if (!regNo) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    // ✅ VALIDATION
    if (hasPeer) {
      if (!form.knownPeer.trim()) {
        alert("Please enter your friend's Registration Number");
        return;
      }
    } else {
      const required = ["diet", "sleep", "cleanliness", "study", "noise", "personality"];
      const missing = required.filter((field) => !form[field]);
      if (missing.length > 0) {
        alert("Please fill all preferences: " + missing.join(", "));
        return;
      }
    }

    try {
      const res = await fetch("http://localhost:5000/api/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          knownPeer: hasPeer ? form.knownPeer : "",
          regNo
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + data.error);
        return;
      }

      alert("Preferences Submitted");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Error saving preferences");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex justify-center items-center p-6">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Fill Your Preferences
        </h2>

        {/* TOGGLE */}
        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasPeer}
              onChange={() => setHasPeer(!hasPeer)}
            />
            <span>I already have a preferred roommate</span>
          </label>
        </div>

        {/* CONDITIONAL */}
        {hasPeer ? (
          <input
            placeholder="Enter Friend's RegNo"
            className="w-full p-3 border rounded mb-4"
            value={form.knownPeer}
            onChange={(e) =>
              setForm({ ...form, knownPeer: e.target.value })
            }
          />
        ) : (
          <>
            <select
              className="w-full p-3 border rounded mb-3"
              value={form.diet}
              onChange={(e) => setForm({ ...form, diet: e.target.value })}
            >
              <option value="">Select Diet</option>
              <option>Veg</option>
              <option>Non-Veg</option>
            </select>

            <select
              className="w-full p-3 border rounded mb-3"
              value={form.sleep}
              onChange={(e) => setForm({ ...form, sleep: e.target.value })}
            >
              <option value="">Sleep Habit</option>
              <option>Early</option>
              <option>Late</option>
            </select>

            <select
              className="w-full p-3 border rounded mb-3"
              value={form.cleanliness}
              onChange={(e) =>
                setForm({ ...form, cleanliness: e.target.value })
              }
            >
              <option value="">Cleanliness</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              className="w-full p-3 border rounded mb-3"
              value={form.study}
              onChange={(e) => setForm({ ...form, study: e.target.value })}
            >
              <option value="">Study Style</option>
              <option>Silent</option>
              <option>Interactive</option>
            </select>

            <select
              className="w-full p-3 border rounded mb-3"
              value={form.noise}
              onChange={(e) => setForm({ ...form, noise: e.target.value })}
            >
              <option value="">Noise Level</option>
              <option>Quiet</option>
              <option>Moderate</option>
              <option>Loud</option>
            </select>

            <select
              className="w-full p-3 border rounded mb-4"
              value={form.personality}
              onChange={(e) =>
                setForm({ ...form, personality: e.target.value })
              }
            >
              <option value="">Personality</option>
              <option>Introvert</option>
              <option>Extrovert</option>
            </select>
          </>
        )}

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={deadlinePassed}
          className={`w-full py-3 rounded-xl text-white transition ${
            deadlinePassed
              ? "bg-gray-400"
              : "bg-gradient-to-r from-blue-500 to-green-500 hover:scale-105"
          }`}
        >
          Submit Preferences
        </button>

        {deadlinePassed && (
          <p className="text-red-500 mt-3 text-center">
            Deadline Passed — Cannot Submit
          </p>
        )}

      </div>

    </div>

  );
}
