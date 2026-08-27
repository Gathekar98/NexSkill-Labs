// Mirrors server/config/fees.js — keep both in sync. This copy is only
// used to DISPLAY the fee before checkout; the actual amount charged is
// always looked up server-side, so editing only this file has no effect
// on what's charged.

export const fees = {
  nqt: { label: "National Qualifier Test (NQT)", amount: 499 },
  "data-science": { label: "Data Science & Machine Learning Internship", amount: 4999 },
  "web-development": { label: "Full Stack Web Development Internship", amount: 4999 },
  "digital-marketing": { label: "Digital Marketing Internship", amount: 3499 },
};
