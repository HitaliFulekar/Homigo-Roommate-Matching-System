import { useEffect, useState } from "react";

export default function StudentsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/preferences/submitted")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-green-100">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Students Submissions
      </h1>

      {students.length === 0 ? (
        <p className="text-gray-600">No submissions yet</p>
      ) : (
        <div className="bg-white rounded-xl shadow p-4 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2">RegNo</th>
                <th className="p-2">Diet</th>
                <th className="p-2">Sleep</th>
                <th className="p-2">Cleanliness</th>
                <th className="p-2">Study</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{s.regNo}</td>
                  <td className="p-2">{s.diet}</td>
                  <td className="p-2">{s.sleep}</td>
                  <td className="p-2">{s.cleanliness}</td>
                  <td className="p-2">{s.study}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}