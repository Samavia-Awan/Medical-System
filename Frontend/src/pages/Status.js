import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../Styles/track.css";

function Status() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:5000/api/requests/my", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const statusConfig = {
    pending:  { color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", label: "Pending",  icon: "⏳" },
    approved: { color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0", label: "Approved", icon: "✅" },
    rejected: { color: "#ef4444", bg: "#fef2f2", border: "#fecaca", label: "Rejected", icon: "❌" },
  };

  const counts = {
    all:      data.length,
    pending:  data.filter(r => r.status === "pending").length,
    approved: data.filter(r => r.status === "approved").length,
    rejected: data.filter(r => r.status === "rejected").length,
  };

  const filtered = filter === "all" ? data : data.filter(r => r.status === filter);

  return (
    <>
      <Navbar />
      <div className="track-page">

        {/* HERO */}
        <div className="track-hero">
          <div className="track-hero-bg" />
          <div className="track-hero-overlay" />
          <div className="track-hero-content">
            <div className="track-hero-badge">📋 My Submissions</div>
            <h1 className="track-hero-title">Track My Requests</h1>
            <p className="track-hero-sub">Monitor the status of all your license verification submissions</p>
          </div>
        </div>

        <div className="track-body">

          {/* SUMMARY CARDS */}
          <div className="track-summary">
            {[
              { key: "all",      label: "Total",    num: counts.all,      color: "#2563eb", bg: "#eff6ff" },
              { key: "pending",  label: "Pending",  num: counts.pending,  color: "#f59e0b", bg: "#fffbeb" },
              { key: "approved", label: "Approved", num: counts.approved, color: "#10b981", bg: "#ecfdf5" },
              { key: "rejected", label: "Rejected", num: counts.rejected, color: "#ef4444", bg: "#fef2f2" },
            ].map((s, i) => (
              <button
                key={s.key}
                className={`track-sum-card ${filter === s.key ? "tsc-active" : ""}`}
                style={{ animationDelay: `${i * 0.07}s`, "--ac": s.color, "--abg": s.bg }}
                onClick={() => setFilter(s.key)}
              >
                <div className="tsc-num" style={{ color: s.color }}>{s.num}</div>
                <div className="tsc-lbl">{s.label}</div>
              </button>
            ))}
          </div>

          {/* LIST */}
          {loading ? (
            <div className="track-loading">
              <div className="track-spinner" />
              <span>Loading your requests...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="track-empty">
              <div className="track-empty-icon">📭</div>
              <h3>No {filter === "all" ? "" : filter} requests</h3>
              <p>You haven't submitted any {filter === "all" ? "" : filter} requests yet.</p>
            </div>
          ) : (
            <div className="track-list">
              {filtered.map((item, i) => {
                const cfg = statusConfig[item.status] || statusConfig.pending;
                return (
                  <div
                    key={item._id}
                    className="track-card"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    {/* left accent bar */}
                    <div className="tc-accent" style={{ background: cfg.color }} />

                    <div className="tc-body">
                      <div className="tc-top">
                        {/* avatar */}
                        <div className="tc-avatar" style={{ background: `linear-gradient(135deg, ${cfg.color}33, ${cfg.color}66)`, color: cfg.color }}>
                          {(item.fullName || "?")[0].toUpperCase()}
                        </div>

                        <div className="tc-info">
                          <div className="tc-name">{item.fullName}</div>
                          <div className="tc-license">License: {item.licenseNumber}</div>
                        </div>

                        {/* badge */}
                        <span
                          className="tc-badge"
                          style={{ color: cfg.color, background: cfg.bg, border: `1.5px solid ${cfg.border}` }}
                        >
                          <span className="tc-dot" style={{ background: cfg.color }} />
                          {cfg.label}
                        </span>
                      </div>

                      <div className="tc-meta">
                        {item.createdAt && (
                          <span className="tc-meta-item">
                            📅 Submitted {formatDate(item.createdAt)}
                          </span>
                        )}
                        {item.documents?.length > 0 && (
                          <span className="tc-meta-item">
                            📎 {item.documents.length} document{item.documents.length > 1 ? "s" : ""} attached
                          </span>
                        )}
                      </div>

                      {/* progress bar */}
                      <div className="tc-progress-wrap">
                        <div
                          className="tc-progress-bar"
                          style={{
                            background: cfg.color,
                            width: item.status === "approved" ? "100%" : item.status === "rejected" ? "100%" : "45%",
                            opacity: item.status === "rejected" ? 0.4 : 1
                          }}
                        />
                      </div>
                      <div className="tc-progress-labels">
                        <span style={{ color: "#10b981", fontWeight: 600 }}>Submitted</span>
                        <span style={{ color: item.status !== "pending" ? cfg.color : "#cbd5e1", fontWeight: 600 }}>
                          {item.status === "approved" ? "Approved ✓" : item.status === "rejected" ? "Rejected ✗" : "Under Review..."}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Status;