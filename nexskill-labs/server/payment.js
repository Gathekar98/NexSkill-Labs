const express = require("express");
const crypto = require("crypto");
const razorpay = require("./lib/razorpay");
const { getFee } = require("./config/fees");
const { saveLead } = require("./store");
const { sendMailAsync } = require("./mailer");
const {
  registrationAdminEmail,
  candidateConfirmationEmail,
} = require("./lib/emailTemplates");
const {
  savePendingOrder,
  getPendingOrder,
  deletePendingOrder,
} = require("./lib/pendingOrders");

const router = express.Router();

const REQUIRED_FIELDS = [
  "name",
  "phone",
  "email",
  "college",
  "tenthPercentage",
  "twelfthPercentage",
  "stream",
  "level",
];

function validateForm(fields) {
  for (const key of REQUIRED_FIELDS) {
    if (!fields[key] || !String(fields[key]).trim()) {
      return `Missing required field: ${key}`;
    }
  }
  if (!["Undergraduate", "Postgraduate"].includes(fields.level)) {
    return "Invalid value for level";
  }
  return null;
}

// Step 1: candidate submits the form -> we create a Razorpay order for
// the CORRECT, server-side fee amount (never trust a client-sent amount).
router.post("/create-order", async (req, res) => {
  const { context, formData } = req.body || {};

  const fee = getFee(context);
  if (!fee) {
    return res.status(400).json({ ok: false, error: "Unknown program/context" });
  }

  const error = validateForm(formData || {});
  if (error) return res.status(400).json({ ok: false, error });

  try {
    const order = await razorpay.orders.create({
      amount: fee.amount * 100, // paise
      currency: "INR",
      receipt: `${context}_${Date.now()}`,
      notes: { context, programLabel: fee.label, candidateEmail: formData.email },
    });

    savePendingOrder(order.id, { context, programLabel: fee.label, amount: fee.amount, formData });

    res.json({
      ok: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      programLabel: fee.label,
    });
  } catch (err) {
    console.error("create-order error:", err.message);
    res.status(500).json({ ok: false, error: "Could not start payment. Please try again." });
  }
});

// Step 2: after the Razorpay checkout popup succeeds, the frontend sends
// us back the payment/order/signature so we can cryptographically verify
// the payment actually happened before granting the registration.
router.post("/verify", async (req, res) => {
  const { orderId, paymentId, signature } = req.body || {};

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ ok: false, error: "Missing payment verification fields" });
  }

  const pending = getPendingOrder(orderId);
  if (!pending) {
    return res.status(400).json({ ok: false, error: "Order not found or already processed" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (expectedSignature !== signature) {
    return res.status(400).json({ ok: false, error: "Payment verification failed" });
  }

  const registration = {
    type: "registration",
    context: pending.context,
    programLabel: pending.programLabel,
    amount: pending.amount,
    orderId,
    paymentId,
    paidAt: new Date().toISOString(),
    ...pending.formData,
  };

  deletePendingOrder(orderId);
  saveLead(registration);

  // Respond immediately — the payment is verified and the registration
  // is saved, so the candidate should see success right away. Emails are
  // sent in the background: they must never block or delay this response,
  // since a slow/unreachable SMTP server would otherwise hang the whole
  // request (this is exactly what caused the frontend to get stuck at
  // "Opening payment..." with no response ever coming back).
  res.json({ ok: true });

  const admin = registrationAdminEmail(registration);
  sendMailAsync({ to: process.env.NOTIFY_EMAIL, subject: admin.subject, html: admin.html });

  const candidate = candidateConfirmationEmail(registration);
  sendMailAsync({ to: registration.email, subject: candidate.subject, html: candidate.html });
});

module.exports = router;
