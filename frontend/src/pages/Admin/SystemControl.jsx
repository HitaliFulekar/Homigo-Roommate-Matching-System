import { useEffect, useState } from "react";

export default function SystemControl() {
  const [settings, setSettings] = useState({
    submissionsOpen: true,
    matchingEnabled: true,
    deadline: ""
  });

  const [status, setStatus] = useState("");

  // 🔥 LOAD FROM BACKEND
  useEffect(() => {
    fetch("https://homigo-roommate-matching-system-1.onrender.com/api/system")
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  // 🔥 SAVE TO BACKEND
  const saveSettings = async () => {
    try {
      const res = await fetch("https://homigo-roommate-matching-system-1.onrender.com/api/system", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(settings)
      });

      const data = await res.json();
      setSettings(data);
      setStatus("✅ Settings updated");

    } catch (err) {
      console.error(err);
      setStatus("❌ Error saving settings");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-green-100">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        System Control
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-5">

        {/* Submissions */}
        <div className="flex justify-between items-center">
          <p>Allow Submissions</p>
          <input
            type="checkbox"
            checked={settings.submissionsOpen}
            onChange={() =>
              setSettings({
                ...settings,
                submissionsOpen: !settings.submissionsOpen
              })
            }
          />
        </div>

        {/* Matching */}
        <div className="flex justify-between items-center">
          <p>Enable Matching</p>
          <input
            type="checkbox"
            checked={settings.matchingEnabled}
            onChange={() =>
              setSettings({
                ...settings,
                matchingEnabled: !settings.matchingEnabled
              })
            }
          />
        </div>

        {/* Deadline */}
        <div>
          <p className="mb-1">Submission Deadline</p>
          <input
            type="date"
            value={settings.deadline}
            onChange={(e) =>
              setSettings({ ...settings, deadline: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Save */}
        <button
          onClick={saveSettings}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg"
        >
          Save Settings
        </button>

        <p className="text-sm text-gray-600">{status}</p>

      </div>

    </div>
  );
}