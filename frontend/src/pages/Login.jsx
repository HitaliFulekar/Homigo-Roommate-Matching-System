import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    regNo: "",
    password: ""
  });

  const [role, setRole] = useState("student");

  const handleLogin = async () => {
    if (!form.regNo || !form.password) {
      alert("Enter credentials");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...form, role })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    if (data.role === "admin") {
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
    } else {
      localStorage.setItem("role", "student");
      localStorage.setItem("regNo", data.regNo);
      navigate("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden
                    bg-gradient-to-br from-blue-100 via-white to-green-100">

      {/* 🌈 Background Glow */}
      <div className="absolute w-96 h-96 bg-blue-300/30 rounded-full blur-3xl top-[-100px] left-[-100px] animate-float"></div>
      <div className="absolute w-96 h-96 bg-green-300/30 rounded-full blur-3xl bottom-[-120px] right-[-100px] animate-float"></div>

      {/* 💎 Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl
                      bg-white/90 backdrop-blur-lg border border-blue-200
                      shadow-lg transition duration-300 hover:scale-[1.02]">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600">
            Homigo
          </h1>
          <p className="text-gray-600 text-sm">
            Smart Roommate Matching
          </p>
        </div>

        {/* Role Toggle (UI only change) */}
        <div className="flex mb-5 border border-blue-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-2 text-sm font-semibold transition ${
              role === "student"
                ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 text-sm font-semibold transition ${
              role === "admin"
                ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <input
            placeholder="Registration Number"
            className="w-full px-4 py-3 rounded-lg border border-blue-300
                       focus:ring-2 focus:ring-blue-400 outline-none transition"
            onChange={(e) => setForm({ ...form, regNo: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-blue-300
                       focus:ring-2 focus:ring-blue-400 outline-none transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg text-white font-semibold
                       bg-gradient-to-r from-blue-600 to-green-600
                       hover:scale-[1.05] transition duration-300"
          >
            Login
          </button>

        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Fresher Hostel Allocation • Homigo
        </p>

      </div>
    </div>
  );
}