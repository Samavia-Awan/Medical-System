import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Styles/auth.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (error) setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("SENDING DATA:", formData); // 🔍 DEBUG

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      console.log("SUCCESS RESPONSE:", res.data); // 🔍 DEBUG

      setSuccess(res.data.message || "Account created successfully 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      console.log("FULL ERROR:", err); // 🔍 DEBUG
      console.log("BACKEND RESPONSE:", err.response); // 🔍 DEBUG

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">

        <div className="auth-left">
          <h1>MediClear</h1>
          <h2>Join Healthcare Platform</h2>
          <p>Create account and start your journey.</p>

          <ul>
            <li>🔐 Secure system</li>
            <li>⚡ Fast access</li>
            <li>📊 Smart dashboard</li>
          </ul>
        </div>

        <div className="auth-card">
          <h2>Create Account 🚀</h2>

          {error && (
            <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
          )}

          {success && (
            <p style={{ color: "lightgreen", fontSize: "14px" }}>
              {success}
            </p>
          )}

          <form onSubmit={handleRegister}>
            
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="switch">
            Already have account? <Link to="/">Login</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;