const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Without these, a slow/blocked SMTP connection can hang forever with
  // no error — which blocks the whole HTTP request if it's awaited.
  // These make sure nodemailer gives up and rejects instead of hanging.
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 10_000,
});

async function sendMail({ to, subject, html }) {
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

module.exports = { sendMail, sendMailAsync, transporter };

