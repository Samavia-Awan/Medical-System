const router = require("express").Router();
const multer = require("multer");
const Request = require("../models/Request");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/create", auth, upload.single("document"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const newRequest = await Request.create({
      userId: req.user.id,
      fullName: req.body.fullName,
      licenseNumber: req.body.licenseNumber,
      documents: req.file ? [req.file.filename] : [],
      status: "pending"
    });

    res.status(201).json({
      message: "Submission successful",
      request: newRequest
    });

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

module.exports = router;