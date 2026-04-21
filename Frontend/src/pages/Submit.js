import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../Styles/auth.css";

function Submit() {
  const [form, setForm] = useState({
    fullName: "",
    licenseNumber: ""
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    if (!form.fullName || !form.licenseNumber) {
      alert("Please fill in all fields.");
      return;
    }

    if (!file) {
      alert("Please select a file.");
      return;
    }

    setLoading(true);

    const fd = new FormData();
    fd.append("fullName", form.fullName);
    fd.append("licenseNumber", form.licenseNumber);
    fd.append("document", file);

    try {
      await axios.post(
        "http://localhost:5000/api/upload/create",
        fd,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setSuccess(true);
      setForm({ fullName: "", licenseNumber: "" });
      setFile(null);

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <h1>Submit Verification Request</h1>
          <p>Provide your license information and supporting document</p>
        </div>

        {success && (
          <div className="success-message">
            ✅ Request submitted successfully! You can track it in My Requests.
          </div>
        )}

        <div className="form-card">

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Dr. John Smith"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>License Number</label>
            <input
              type="text"
              placeholder="MED-2024-00123"
              value={form.licenseNumber}
              onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Upload Document</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && (
              <p style={{ marginTop: "8px", color: "#10b981", fontSize: "15px", fontWeight: "500" }}>
                ✓ Selected: {file.name}
              </p>
            )}
          </div>

          <button
            className="btn-primary"
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

        </div>
      </div>
    </>
  );
}

export default Submit;