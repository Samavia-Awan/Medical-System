import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Styles/Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT PANEL — hospital photo */}
      <div className="login-left">
        <div className="login-left-overlay" />
        <div className="login-left-content">
          <div className="login-brand">
            <span className="login-brand-icon">🏥</span>
            <span className="login-brand-name">MediClear</span>
          </div>
          <h1 className="login-left-title">
            Medical License<br />Verification<br />
            <span className="login-left-accent">Made Simple.</span>
          </h1>
          <p className="login-left-desc">
            A secure, paperless platform for doctors and administrators to verify medical licenses in real time.
          </p>
          <div className="login-features">
            <div className="login-feature">
              <span className="lf-icon">🔒</span>
              <span>Encrypted document storage</span>
            </div>
            <div className="login-feature">
              <span className="lf-icon">⚡</span>
              <span>Real-time status tracking</span>
            </div>
            <div className="login-feature">
              <span className="lf-icon">✅</span>
              <span>Fast admin review & approval</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — form */}
      <div className="login-right">
        <div className="login-form-wrap">

          <div className="login-form-header">
            <h2>Welcome back</h2>
            <p>Sign in to your MediClear account</p>
          </div>

          {error && (
            <div className="login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="lf-group">
              <label>Email Address</label>
              <div className="lf-input-wrap">
                <span className="lf-input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="lf-group">
              <label>Password</label>
              <div className="lf-input-wrap">
                <span className="lf-input-icon">🔑</span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="login-spinner" />
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          <div className="login-footer">
            New to MediClear?{" "}
            <Link to="/register">Create an account</Link>
          </div>

          <div className="login-back">
            <Link to="/">← Back to Home</Link>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;