const nodemailer = require("nodemailer");
const dns = require("dns").promises;

// ─────────────────────────────────────────────────────────────
// IPv4-forcing SMTP setup.
//
// Some hosts (Render included) don't support outbound IPv6, but
// smtp.gmail.com resolves to BOTH an IPv4 and an IPv6 address. Setting
// nodemailer's `family: 4` option is not reliably respected for every
// connection it opens, so instead we resolve the IPv4 address ourselves
// up front and connect directly to that IP. We still set `tls.servername`
// to the real hostname so the TLS certificate check (which validates
// against a hostname, not an IP) continues to pass correctly.
// ─────────────────────────────────────────────────────────────

let transporterPromise = null;

async function buildTransporter() {
  const hostname = process.env.SMTP_HOST;
  let connectHost = hostname;

  try {
    const { address } = await dns.lookup(hostname, { family: 4 });
    connectHost = address;
  } catch (err) {
    console.error(`Could not resolve IPv4 address for ${hostname}, falling back to hostname:`, err.message);
  }

  return nodemailer.createTransport({
    host: connectHost,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      servername: hostname, // keep TLS cert validation working against a real IP
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });
}

function getTransporter() {
  if (!transporterPromise) {
    transporterPromise = buildTransporter();
  }
  return transporterPromise;
}

async function sendMail({ to, subject, html }) {
  const transporter = await getTransporter();
  await transporter.sendMail({
    from: `"NexSkill Labs" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
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
