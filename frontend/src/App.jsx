import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PreferenceForm from "./pages/PreferenceForm";
import MatchResult from "./pages/MatchResult";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentsList from "./pages/Admin/StudentsList";
import MatchingControl from "./pages/Admin/MatchingControl";
import Results from "./pages/Admin/Results";  
import SystemControl from "./pages/Admin/SystemControl";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preferences" element={<PreferenceForm />} />
        <Route path="/match" element={<MatchResult />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<StudentsList />} />
        <Route path="/admin/matching" element={<MatchingControl />} />
        <Route path="/admin/results" element={<Results />} />
        <Route path="/admin/control" element={<SystemControl />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;