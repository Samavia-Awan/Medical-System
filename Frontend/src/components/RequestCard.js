function RequestCard({ data, onApprove, onReject }) {
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { class: "badge-pending", icon: "⏳" },
      approved: { class: "badge-approved", icon: "✓" },
      rejected: { class: "badge-rejected", icon: "✕" }
    };
    const config = statusMap[status] || statusMap.pending;
    return <span className={`badge ${config.class}`}><span className="badge-dot"></span>{config.icon} {status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
  };

  return (
    <div className="request-card">
      <div className="request-card-header">
        <div>
          <div className="request-card-title">👤 {data.fullName}</div>
          <div className="request-card-subtitle">License: {data.licenseNumber}</div>
        </div>
        {getStatusBadge(data.status)}
      </div>
      
      <div style={{ fontSize: "13px", color: "#999999", margin: "12px 0 8px 0" }}>
        📅 Submitted {formatDate(data.createdAt)}
      </div>

      {data.documents && data.documents.length > 0 && (
        <div style={{ fontSize: "13px", color: "#666666" }}>
          📎 {data.documents.length} document{data.documents.length > 1 ? "s" : ""} attached
        </div>
      )}

      {data.status === "pending" && onApprove && onReject && (
        <div className="action-buttons">
          <button className="btn-action approve" onClick={() => onApprove(data._id)}>
            <span>✓</span> Approve
          </button>
          <button className="btn-action reject" onClick={() => onReject(data._id)}>
            <span>✕</span> Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default RequestCard;