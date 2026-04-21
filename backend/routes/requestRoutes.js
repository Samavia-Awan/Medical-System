const router = require("express").Router();
const Request = require("../models/Request");
const auth = require("../middleware/auth");
const multer = require("multer");

/* FILE UPLOAD */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

/* CREATE REQUEST */
router.post("/", auth, upload.array("documents"), async (req, res) => {
  try {
    const files = req.files ? req.files.map(f => f.filename) : [];

    const data = await Request.create({
      userId: req.user.id,
      fullName: req.body.fullName,
      licenseNumber: req.body.licenseNumber,
      documents: files
    });

    res.json(data);
  } catch (err) {
    console.log("Error creating request:", err);
    res.status(500).json({ message: err.message });
  }
});

/* USER TRACK */
router.get("/my", auth, async (req, res) => {
  try {
    const data = await Request.find({ userId: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ADMIN ONLY - ALL REQUESTS */
router.get("/", auth, async (req, res) => {
  try {
    const data = await Request.find().populate("userId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/* UPDATE STATUS */
/* UPDATE STATUS */
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;