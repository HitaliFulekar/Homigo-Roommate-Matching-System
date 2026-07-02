import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Chatbot from "./Chatbot";

export default function Dashboard() {
  const [system, setSystem] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [student, setStudent] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  const navigate = useNavigate();
  const regNo = localStorage.getItem("regNo");

  const fetchData = () => {
    fetch("https://homigo-roommate-matching-system-1.onrender.com/api/system?ts=" + Date.now())
      .then(res => res.json())
      .then(data => setSystem(data));

    fetch("https://homigo-roommate-matching-system-1.onrender.com/api/announcements?ts=" + Date.now())
      .then(res => res.json())
      .then(data => setAnnouncements(data));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const regNo = localStorage.getItem("regNo");

  fetch(`https://homigo-roommate-matching-system-1.onrender.com/api/auth/student/${regNo}`)
    .then(res => res.json())
    .then(data => setStudent(data))
    .catch(err => console.error(err));
}, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!system) return <h2 className="p-6">Loading...</h2>;

  const deadlinePassed =
    system.deadline && new Date(system.deadline) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-4">
          <img src={logo} className="h-14" />

          <div>
            <h1 className="text-4xl font-extrabold text-blue-700">
              Homigo
            </h1>

            <p className="text-gray-600 text-sm">
              Dr. B. R. Ambedkar National Institute of Technology Jalandhar
            </p>

            <p className="text-gray-500 text-xs">
              Student Roommate Matching Portal
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowProfile(true)}
          className="px-4 py-2 bg-white border border-blue-200 rounded-xl shadow hover:shadow-md transition"
        >
          Profile
        </button>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* ACTION CARDS */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Preferences */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition">
              <h2 className="font-semibold mb-4 text-lg text-gray-700">
                Preferences
              </h2>

              {!deadlinePassed ? (
                <button
                  onClick={() => navigate("/preferences")}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
                >
                  Fill Preferences
                </button>
              ) : (
                <p className="text-red-500 font-medium">
                  Deadline Passed
                </p>
              )}
            </div>

            {/* Results */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition">
              <h2 className="font-semibold mb-4 text-lg text-gray-700">
                Results
              </h2>

              {deadlinePassed ? (
                <button
                  onClick={() => navigate("/match")}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
                >
                  View Results
                </button>
              ) : (
                <p className="text-gray-500">
                  Available after deadline
                </p>
              )}
            </div>

            {/* 🔥 NEW: BOOK ROOM */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition">
              <h2 className="font-semibold mb-4 text-lg text-gray-700">
                Room Allocation
              </h2>

              {deadlinePassed ? (
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://www.nitj.ac.in/lifeAtNitj/hostel.html")
                  }
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
                >
                  Book Room
                </button>
              ) : (
                <p className="text-gray-500">
                  Available after results
                </p>
              )}
            </div>

          </div>

          {/* ANNOUNCEMENTS */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
            <h2 className="font-semibold mb-4 text-lg text-gray-700">
              Announcements
            </h2>

            {announcements.length === 0 ? (
              <p className="text-gray-500">No announcements yet</p>
            ) : (
              announcements.map((a, i) => (
                <div key={i} className="border-b py-3 last:border-none">
                  <p className="text-gray-700">{a.text}</p>
                  <small className="text-gray-500">
                    {a.time || ""}
                  </small>
                </div>
              ))
            )}
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* IMPORTANT DATES */}
          <div className="bg-white p-5 rounded-2xl shadow-lg border border-green-200 space-y-3">

            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Important Dates
            </h3>

            <div>
              <p className="text-xs text-gray-500">Submission Deadline</p>
              <p className="text-sm font-semibold text-blue-600">
                {system.deadline
                  ? new Date(system.deadline).toLocaleString()
                  : "Not set"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Result Release</p>
              <p className="text-sm font-semibold text-purple-600">
                {system.deadline
                  ? new Date(
                      new Date(system.deadline).getTime() +
                        24 * 60 * 60 * 1000
                    ).toLocaleString()
                  : "After deadline"}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* PROFILE MODAL */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-2xl w-80 relative shadow-lg">

            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>

            <h2 className="text-lg font-bold mb-4 text-blue-600">
              Profile
            </h2>

            {student ? (
              <div className="space-y-2 text-sm text-gray-700">

                <p>
                  <strong>Name:</strong> {student.name}
                </p>

                <p>
                  <strong>Reg No:</strong> {regNo}
                </p>

                <p>
                  <strong>Branch:</strong> {student.branch}
                </p>

                <p>
                  <strong>Year:</strong> {student.year}
                </p>

                <p>
                  <strong>Home State:</strong> {student.homeState}
                </p>

              </div>
            ) : (
              <p className="text-gray-500">Loading...</p>
            )}

            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        </div>
      )}

      <Chatbot />
    </div>
  );
}