const brand = require("../config/brand");
const logoDataUri = require("../assets/logoBase64");

// Table-based logo mark (safe across email clients — no external image
// needed). Three colored dots echoing the site's "skill graph" motif.
function logoMarkHtml() {
  return `
    <table cellpadding="0" cellspacing="0" style="margin:0 auto 8px;">
      <tr>
        <td style="padding:0 3px;"><div style="width:8px;height:8px;border-radius:50%;background:#22D3EE;"></div></td>
        <td style="padding:0 3px;"><div style="width:8px;height:8px;border-radius:50%;background:#A78BFA;"></div></td>
        <td style="padding:0 3px;"><div style="width:8px;height:8px;border-radius:50%;background:#F472B6;"></div></td>
      </tr>
    </table>`;
}

function baseWrapper({ eyebrow, title, bodyHtml }) {
  return `
  <div style="background:#0E0B1A;padding:32px 16px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;border-collapse:collapse;">
      <tr>
        <td style="padding:28px 32px;text-align:center;background:linear-gradient(135deg,#1E1832,#161226);border-radius:16px 16px 0 0;border:1px solid #2C2444;border-bottom:none;">
          ${logoMarkHtml()}
          <p style="margin:0;color:#F4F1FB;font-size:18px;font-weight:700;letter-spacing:0.3px;">${brand.companyName}</p>
          ${eyebrow ? `<p style="margin:6px 0 0;color:#22D3EE;font-size:11px;letter-spacing:2px;text-transform:uppercase;">${eyebrow}</p>` : ""}
        </td>
      </tr>
      <tr>
        <td style="padding:32px;background:#161226;border-left:1px solid #2C2444;border-right:1px solid #2C2444;">
          <h1 style="margin:0 0 16px;color:#F4F1FB;font-size:22px;font-weight:700;">${title}</h1>
          <div style="color:#D8D3E8;font-size:15px;line-height:1.6;">${bodyHtml}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px;background:#12101F;border:1px solid #2C2444;border-top:1px solid #2C2444;border-radius:0 0 16px 16px;text-align:center;">
          <img src="${logoDataUri}" alt="${brand.companyName}" width="200" style="display:block;margin:0 auto 20px;border-radius:8px;max-width:200px;height:auto;" />
          <p style="margin:0 0 4px;color:#9C93B5;font-size:13px;">${brand.ownerName} · ${brand.companyName}</p>
          <p style="margin:0 0 4px;color:#9C93B5;font-size:13px;">${brand.supportEmail} · ${brand.supportPhone}</p>
          <p style="margin:0 0 12px;color:#6F6789;font-size:12px;">${brand.address}</p>
          <a href="${brand.linkedin}" style="color:#A78BFA;font-size:12px;text-decoration:none;">LinkedIn →</a>
          <p style="margin:16px 0 0;color:#4A4468;font-size:11px;">© ${new Date().getFullYear()} ${brand.companyName}. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </div>`;
}

function fieldRows(fields) {
  return `
  <table role="presentation" width="100%" style="border-collapse:collapse;margin-top:8px;">
    ${Object.entries(fields)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(
        ([label, value]) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #2C2444;color:#9C93B5;font-size:13px;width:40%;vertical-align:top;">${label}</td>
        <td style="padding:8px 0;border-bottom:1px solid #2C2444;color:#F4F1FB;font-size:14px;">${value}</td>
      </tr>`
      )
      .join("")}
  </table>`;
}

// ── Admin notification: generic contact form ──────────────────────
function contactAdminEmail({ name, email, phone, message }) {
  return {
    subject: `New contact enquiry — ${name}`,
    html: baseWrapper({
      eyebrow: "Contact form",
      title: "New enquiry from your website",
      bodyHtml: `
        ${fieldRows({ Name: name, Email: email, Phone: phone })}
        <p style="margin:20px 0 6px;color:#9C93B5;font-size:13px;">Message</p>
        <p style="margin:0;padding:14px;background:#1E1832;border-radius:10px;color:#F4F1FB;font-size:14px;line-height:1.6;">${message}</p>
      `,
    }),
  };
}

// ── Admin notification: newsletter subscribe ───────────────────────
function subscribeAdminEmail({ email }) {
  return {
    subject: `New newsletter subscriber`,
    html: baseWrapper({
      eyebrow: "Newsletter",
      title: "Someone joined your mailing list",
      bodyHtml: fieldRows({ Email: email }),
    }),
  };
}

// ── Admin notification: careers / job application ──────────────────
function careersAdminEmail({ name, email, phone, program, message }) {
  return {
    subject: `New application — ${program || "General"} — ${name}`,
    html: baseWrapper({
      eyebrow: "Careers",
      title: "New job application",
      bodyHtml: `
        ${fieldRows({ Name: name, Email: email, Phone: phone, Role: program })}
        ${message ? `<p style="margin:20px 0 6px;color:#9C93B5;font-size:13px;">Note</p><p style="margin:0;padding:14px;background:#1E1832;border-radius:10px;color:#F4F1FB;font-size:14px;">${message}</p>` : ""}
      `,
    }),
  };
}

// ── Admin notification: paid registration (NQT / program / internship) ──
function registrationAdminEmail(reg) {
  return {
    subject: `💰 Paid registration — ${reg.programLabel} — ${reg.name}`,
    html: baseWrapper({
      eyebrow: "Registration & Payment",
      title: `New paid registration: ${reg.programLabel}`,
      bodyHtml: `
        <p style="margin:0 0 16px;padding:12px 16px;background:rgba(34,211,238,0.12);border:1px solid #22D3EE;border-radius:10px;color:#22D3EE;font-size:14px;font-weight:600;">
          Payment received: ₹${reg.amount} · ${reg.paymentId}
        </p>
        ${fieldRows({
          Name: reg.name,
          Email: reg.email,
          Phone: reg.phone,
          College: reg.college,
          "10th %": reg.tenthPercentage,
          "12th %": reg.twelfthPercentage,
          Stream: reg.stream,
          Level: reg.level,
          "Registered for": reg.programLabel,
          "Amount paid": `₹${reg.amount}`,
          "Payment ID": reg.paymentId,
          "Order ID": reg.orderId,
          "Paid at": reg.paidAt,
        })}
      `,
    }),
  };
}

// ── Candidate confirmation: sent after successful payment ──────────
function candidateConfirmationEmail(reg) {
  return {
    subject: `You're registered — ${reg.programLabel} ✅`,
    html: baseWrapper({
      eyebrow: "Registration confirmed",
      title: `Hi ${reg.name.split(" ")[0]}, you're all set!`,
      bodyHtml: `
        <p style="margin:0 0 16px;">
          Thanks for registering for <strong style="color:#F4F1FB;">${reg.programLabel}</strong>.
          Your payment has been received and your seat is confirmed.
        </p>
        <div style="margin:0 0 20px;padding:16px;background:#1E1832;border-radius:10px;border:1px solid #2C2444;">
          <p style="margin:0 0 10px;color:#9C93B5;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Payment receipt</p>
          ${fieldRows({
            "Registered for": reg.programLabel,
            "Amount paid": `₹${reg.amount}`,
            "Payment ID": reg.paymentId,
            Date: reg.paidAt,
          })}
        </div>
        <p style="margin:0 0 16px;">
          We'll review your details and get back to you shortly with next steps
          and onboarding information. Keep an eye on your inbox (and spam
          folder, just in case).
        </p>
        <p style="margin:0;">Questions in the meantime? Just reply to this email.</p>
      `,
    }),
  };
}

module.exports = {
  contactAdminEmail,
  subscribeAdminEmail,
  careersAdminEmail,
  registrationAdminEmail,
  candidateConfirmationEmail,
};
