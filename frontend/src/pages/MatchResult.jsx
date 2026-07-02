import { useEffect, useState } from "react";

export default function Match() {
  const [match, setMatch] = useState(null);

  const regNo = localStorage.getItem("regNo");

  useEffect(() => {
    fetch(`https://homigo-roommate-matching-system-1.onrender.com/api/matching/${regNo}`)
      .then(res => res.json())
      .then(data => setMatch(data));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">

        <h1 className="text-2xl font-bold mb-4">Your Match</h1>

        {!match ? (
          <p className="text-gray-500">No match found</p>
        ) : (
          <div>
            <p className="text-lg mb-2">
              You: <strong>{match.you}</strong>
            </p>

            <p className="text-lg">
              Roommate: <strong>{match.roommate}</strong>
            </p>
          </div>
        )}

      </div>

    </div>
  );
}