
const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  createEnquiry,
  getEnquiries,
} = require("../controllers/enquiryController");

const router = express.Router();

const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many submissions. Please try again later.",
  },
});

const requireAdmin = (req, res, next) => {
  const adminKey = process.env.ADMIN_KEY;
  const providedKey = req.get("x-admin-key");

  if (!adminKey || !providedKey || providedKey !== adminKey) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access.",
    });
  }

  next();
};

router.post("/", submissionLimiter, createEnquiry);
router.get("/", requireAdmin, getEnquiries);

module.exports = router;