import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Submit from "./pages/Submit";
import Admin from "./pages/Admin";
import Status from "./pages/Status";
import About from "./pages/About"; // 👈 add this

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />        {/* 👈 About is now first */}
        <Route path="/login" element={<Login />} />   {/* 👈 Login moved here */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/status" element={<Status />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;