import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../Styles/auth.css";
import "../Styles/Admin dashboard.css";

function Admin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.log("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }
    fetchData();
  }, [fetchData, token]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  const getBadge = (status) => {
    if (status === "approved")
      return <span className="badge badge-approved"><span className="badge-dot"></span>Approved</span>;
    if (status === "rejected")
      return <span className="badge badge-rejected"><span className="badge-dot"></span>Rejected</span>;
    return <span className="badge badge-pending"><span className="badge-dot"></span>Pending</span>;
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    });

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <p>Review and manage all license verification requests</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total</div>
            <div className="stat-value">{counts.all}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending</div>
            <div className="stat-value orange">{counts.pending}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Approved</div>
            <div className="stat-value green">{counts.approved}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Rejected</div>
            <div className="stat-value red">{counts.rejected}</div>
          </div>
        </div>

        <div className="filter-buttons">
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? "active" : ""}`}
            >
              {f} {f !== "all" && `(${counts[f]})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span>Loading requests...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <h3>No {filter === "all" ? "" : filter} requests</h3>
              <p>There are no requests to display.</p>
            </div>
          </div>
        ) : (
          filtered.map((req) => (
            <div key={req._id} className="request-card">
              <div className="request-card-header">
                <div>
                  <div className="request-card-title">{req.fullName}</div>
                  <div className="request-card-subtitle">
                    License: {req.licenseNumber}
                    {req.userId?.email && <> · {req.userId.email}</>}
                  </div>
                </div>
                {getBadge(req.status)}
              </div>

              {req.createdAt && (
                <div style={{ fontSize: "15px", color: "#6b7280", marginTop: "4px" }}>
                  Submitted {formatDate(req.createdAt)}
                </div>
              )}

              {req.documents && req.documents.length > 0 && (
                <div style={{ fontSize: "15px", color: "#6b7280", marginTop: "6px" }}>
                  {req.documents.length} document{req.documents.length > 1 ? "s" : ""} attached
                </div>
              )}

              {req.status === "pending" ? (
                <div className="action-buttons">
                  <button className="btn-action approve" onClick={() => updateStatus(req._id, "approved")}>
                    ✓ Approve
                  </button>
                  <button className="btn-action reject" onClick={() => updateStatus(req._id, "rejected")}>
                    ✕ Reject
                  </button>
                </div>
              ) : (
                <div className="action-buttons">
                  <button
                    className="btn-action"
                    style={{ background: "#f3f4f6", color: "#666", border: "1.5px solid #d1d5db" }}
                    onClick={() => updateStatus(req._id, "pending")}
                  >
                    ↻ Reset to Pending
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Admin;