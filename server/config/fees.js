// ─────────────────────────────────────────────────────────────
// FEES — one place to control what each registration form charges.
// Amounts are in INR (rupees). The frontend shows these for display,
// but the ACTUAL charged amount is always looked up here on the
// server when creating a payment order — never trust an amount sent
// from the browser.
// ─────────────────────────────────────────────────────────────

const fees = {
  nqt: {
    label: "National Qualifier Test (NQT)",
    amount: 499,
  },
  "data-science": {
    label: "Data Science & Machine Learning Internship",
    amount: 4999,
  },
  "web-development": {
    label: "Full Stack Web Development Internship",
    amount: 4999,
  },
  "digital-marketing": {
    label: "Digital Marketing Internship",
    amount: 3499,
  },
};

function getFee(context) {
  return fees[context] || null;
}

module.exports = { fees, getFee };
