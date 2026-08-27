// ─────────────────────────────────────────────────────────────
// Email sending via Brevo's HTTP API (https://api.brevo.com) instead
// of raw SMTP.
//
// Why: Render blocks outbound traffic on SMTP ports (25, 465, 587) for
// free web services (confirmed via Render's own changelog, Sept 2025) —
// this is a network-level firewall rule, not something any code change
// can work around. Brevo's API sends over plain HTTPS (port 443), which
// is never blocked, since blocking it would break ordinary web traffic
// too.
//
// Setup: sign up at brevo.com, verify BREVO_SENDER_EMAIL as a "sender"
// in their dashboard (Settings → Senders, Domains & Dedicated IPs), then
// generate an API key under SMTP & API → API Keys.
// ─────────────────────────────────────────────────────────────

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
const SENDER_NAME = process.env.BREVO_SENDER_NAME || "NexSkill Labs";

async function sendMail({ to, subject, html }) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Brevo API error (${res.status}): ${body}`);
  }
}

// Fire-and-forget version: use this whenever the email is a
// "nice to have" notification and must NEVER block or delay the HTTP
// response (e.g. after payment verification, where the registration is
// already saved and confirmed regardless of whether the email succeeds).
function sendMailAsync({ to, subject, html }) {
  sendMail({ to, subject, html }).catch((err) => {
    console.error(`sendMailAsync failed (to: ${to}, subject: "${subject}"):`, err.message);
  });
}

module.exports = { sendMail, sendMailAsync };
