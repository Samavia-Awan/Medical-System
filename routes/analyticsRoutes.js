const router = require("express").Router();
const Request = require("../models/Request");
const auth = require("../middleware/auth");

// ONLY ADMIN
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "hospital_admin") {
    return res.status(403).json({ error: "Not allowed" });
  }

  const total = await Request.countDocuments();
  const pending = await Request.countDocuments({ status: "pending" });
  const approved = await Request.countDocuments({ status: "approved" });
  const rejected = await Request.countDocuments({ status: "rejected" });

  res.json({ total, pending, approved, rejected });
});

module.exports = router;