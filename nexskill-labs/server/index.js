require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sendMailAsync } = require("./mailer");
const { saveLead, readLeads } = require("./store");
const {
  contactAdminEmail,
  subscribeAdminEmail,
  careersAdminEmail,
} = require("./lib/emailTemplates");
const paymentRoutes = require("./payment");

const app = express();
app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());
app.use(cors({ origin: allowedOrigins }));

// --- tiny in-memory rate limiter (per IP) to cut down on spam ---
const hits = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60_000;
  const max = 8;
  const record = hits.get(ip) || { count: 0, start: now };
  if (now - record.start > windowMs) {
    record.count = 0;
    record.start = now;
  }
  record.count += 1;
  hits.set(ip, record);
  if (record.count > max) {
    return res.status(429).json({ ok: false, error: "Too many requests. Please try again shortly." });
  }
  next();
}

function validate(fields, required) {
  for (const key of required) {
    if (!fields[key] || !String(fields[key]).trim()) {
      return `Missing required field: ${key}`;
    }
  }
  return null;
}

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Contact form
app.post("/api/contact", rateLimit, (req, res) => {
  const { name, email, phone, message } = req.body || {};
  const error = validate({ name, email, message }, ["name", "email", "message"]);
  if (error) return res.status(400).json({ ok: false, error });

  saveLead({ type: "contact", name, email, phone, message });
  res.json({ ok: true });

  const { subject, html } = contactAdminEmail({ name, email, phone, message });
  sendMailAsync({ to: process.env.NOTIFY_EMAIL, subject, html });
});

// Careers / job application form (unrelated to paid program registrations)
app.post("/api/register", rateLimit, (req, res) => {
  const { name, email, phone, program, message } = req.body || {};
  const error = validate({ name, email }, ["name", "email"]);
  if (error) return res.status(400).json({ ok: false, error });

  saveLead({ type: "careers_application", name, email, phone, program, message });
  res.json({ ok: true });

  const { subject, html } = careersAdminEmail({ name, email, phone, program, message });
  sendMailAsync({ to: process.env.NOTIFY_EMAIL, subject, html });
});

// Newsletter signup
app.post("/api/subscribe", rateLimit, (req, res) => {
  const { email } = req.body || {};
  const error = validate({ email }, ["email"]);
  if (error) return res.status(400).json({ ok: false, error });

  saveLead({ type: "subscribe", email });
  res.json({ ok: true });

  const { subject, html } = subscribeAdminEmail({ email });
  sendMailAsync({ to: process.env.NOTIFY_EMAIL, subject, html });
});

// Paid registrations: NQT / internships / programs
app.use("/api/payment", rateLimit, paymentRoutes);

// Simple admin view of captured leads — protect this before going to production.
app.get("/api/leads", (_req, res) => {
  res.json(readLeads());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`NexSkill Labs API running on port ${PORT}`));
