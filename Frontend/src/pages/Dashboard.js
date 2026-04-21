import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../Styles/auth.css";
import "../Styles/dashboard.css";

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name") || "Doctor";

  useEffect(() => {
    axios.get("http://localhost:5000/api/requests/my", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRequests(res.data))
      .catch(err => console.log(err));
  }, [token]);

  const counts = {
    total: requests.length,
    approved: requests.filter(r => r.status === "approved").length,
    pending: requests.filter(r => r.status === "pending").length,
    rejected: requests.filter(r => r.status === "rejected").length
  };

  const recent = requests.slice(-3).reverse(); // last 3 requests

  return (
    <>
      <Navbar />
      <div className="dash-page">

        {/* HERO */}
        <div className="dash-hero">
          <div className="hero-blob blob1"></div>
          <div className="hero-blob blob2"></div>
          <div className="hero-blob blob3"></div>
          <div className="dash-hero-content">
            <div className="dash-greeting-badge">🏥 Medical Portal</div>
            <h1 className="dash-greeting">Good morning, {name}! 👋</h1>
            <p className="dash-subtitle">Here's an overview of your license verification activity</p>
          </div>
        </div>

        <div className="dash-body">

          {/* STATS */}
          <div className="dash-stats">
            <div className="dash-stat-card stat-blue">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-num">{counts.total}</div>
                <div className="stat-lbl">Total Submitted</div>
              </div>
              <div className="stat-bg-icon">📄</div>
            </div>

            <div className="dash-stat-card stat-green">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-num">{counts.approved}</div>
                <div className="stat-lbl">Approved</div>
              </div>
              <div className="stat-bg-icon">✅</div>
            </div>

            <div className="dash-stat-card stat-orange">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-num">{counts.pending}</div>
                <div className="stat-lbl">Pending Review</div>
              </div>
              <div className="stat-bg-icon">⏳</div>
            </div>

            <div className="dash-stat-card stat-pink">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-num">{counts.rejected}</div>
                <div className="stat-lbl">Rejected</div>
              </div>
              <div className="stat-bg-icon">❌</div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="dash-section-title">Quick Actions</div>
          <div className="dash-actions">
            <Link to="/submit" className="dash-action-card action-submit">
              <div className="action-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <div className="action-title">Submit New Request</div>
              <div className="action-desc">Upload your license documents for verification</div>
              <div className="action-arrow">→</div>
            </Link>

            <Link to="/status" className="dash-action-card action-track">
              <div className="action-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                </svg>
              </div>
              <div className="action-title">Track My Requests</div>
              <div className="action-desc">Monitor the status of all your submissions</div>
              <div className="action-arrow">→</div>
            </Link>

            <Link to="/admin" className="dash-action-card action-admin">
              <div className="action-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <div className="action-title">Admin Panel</div>
              <div className="action-desc">Review and manage all license requests</div>
              <div className="action-arrow">→</div>
            </Link>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="dash-section-title">Recent Activity</div>
          <div className="dash-activity-card">
            {recent.length === 0 ? (
              <div className="activity-empty">
                <div className="activity-empty-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                </div>
                <h3>No activity yet</h3>
                <p>Submit your first license verification request to see activity here.</p>
                <Link to="/submit" className="activity-cta">Submit a Request →</Link>
              </div>
            ) : (
              recent.map(req => (
                <div key={req._id} style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ fontWeight: "600" }}>{req.fullName}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>
                    License: {req.licenseNumber} · 
                    <span style={{ 
                      color: req.status === "approved" ? "green" : req.status === "rejected" ? "red" : "orange",
                      marginLeft: "6px", textTransform: "capitalize"
                    }}>
                      {req.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;