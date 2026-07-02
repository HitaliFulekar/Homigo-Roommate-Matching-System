import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [currentDeadline, setCurrentDeadline] = useState("");

  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [editId, setEditId] = useState(null);

  // ================= FETCH =================

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/api/preferences/submitted");
    const data = await res.json();
    setStudents(data);
  };

  const fetchDeadline = async () => {
    const res = await fetch("http://localhost:5000/api/system");
    const data = await res.json();
    setCurrentDeadline(data.deadline || "Not set");
  };

  const fetchAnnouncements = async () => {
    const res = await fetch("http://localhost:5000/api/announcements");
    const data = await res.json();
    setAnnouncements(data);
  };

  useEffect(() => {
  const loadData = async () => {
    await fetchStudents();
    await fetchDeadline();
    await fetchAnnouncements();
  };

  loadData();
}, []);

  // ================= ACTIONS =================

  const saveDeadline = async () => {
    await fetch("http://localhost:5000/api/system", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deadline })
    });

    fetchDeadline();
  };

  const handleAnnouncement = async () => {
    if (!announcement) return;

    // EDIT
    if (editId) {
      await fetch(`http://localhost:5000/api/announcements/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: announcement })
      });

      setEditId(null);
    } else {
      // ADD
      await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: announcement })
      });
    }

    setAnnouncement("");
    fetchAnnouncements();
  };

  const deleteAnnouncement = async (id) => {
    await fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: "DELETE"
    });

    fetchAnnouncements();
  };

  const editAnnouncement = (a) => {
    setAnnouncement(a.text);
    setEditId(a._id);
  };

  const runMatching = async () => {
    await fetch("http://localhost:5000/api/matching/run", {
      method: "POST"
    });

    alert("✅ Matching Completed");
  };

  const viewMatches = () => {
    navigate("/admin/results");
  };

  const publishResults = async () => {
    await fetch("http://localhost:5000/api/system", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: true })
    });

    alert("✅ Results Published");
  };

  const logout = () => {
  localStorage.clear();
  navigate("/");
 };

  // ================= UI =================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            Homigo Admin
          </h1>
          <p className="text-gray-600 text-sm">
            NIT Jalandhar • Admin Control Panel
          </p>
        </div>

        <button
          onClick={logout}
          className="full bg-red-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition"
        >
          Logout
        </button>

      </div>

      {/* DEADLINE */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200 mb-6">
        <h2 className="font-semibold mb-3">Submission Deadline</h2>

        <div className="flex gap-3">
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={saveDeadline}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 rounded-lg"
          >
            Save
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Current: {
            currentDeadline !== "Not set"
              ? new Date(currentDeadline).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
              })
              : "Not set"
          }
        </p>
      </div>

      {/* ANNOUNCEMENTS */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200 mb-6">

        <h2 className="font-semibold mb-3">Announcements</h2>

        <div className="flex gap-3 mb-4">
          <input
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Enter announcement..."
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleAnnouncement}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 rounded-lg"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {announcements.map((a) => (
            <div
              key={a._id}
              className="flex justify-between items-center bg-blue-50 p-3 rounded-xl"
            >
              <p>{a.text}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => editAnnouncement(a)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteAnnouncement(a._id)}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* BUTTONS */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <button
          onClick={runMatching}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
        >
          Run Matching
        </button>

        <button
          onClick={viewMatches}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
        >
          View Matches
        </button>

        <button
          onClick={publishResults}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition"

        >
          Publish Results
        </button>

      </div>

      {/* STUDENTS */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">

        <h2 className="text-xl font-semibold mb-4">
          Registered Students ({students.length})
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-500">No submissions yet</p>
        ) : (
          <div className="space-y-3">

            {students.map((s, index) => (
              <div
                key={index}
                className="border p-3 rounded-xl flex justify-between"
              >
                <div>
                  <p className="font-medium">{s.regNo}</p>
                  <p className="text-sm text-gray-500">
                    {s.diet} • {s.sleep} • {s.study}
                  </p>
                </div>

                {s.knownPeer && (
                  <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                    Peer: {s.knownPeer}
                  </span>
                )}
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}