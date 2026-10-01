// Base URL of the backend API. Set VITE_API_URL in a .env file for
// production (e.g. VITE_API_URL=https://api.yourdomain.com); falls back
// to localhost for local development.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function post(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}

export const api = {
  contact: (payload) => post("/api/contact", payload),
  register: (payload) => post("/api/register", payload),
  subscribe: (email) => post("/api/subscribe", { email }),
  createOrder: (payload) => post("/api/payment/create-order", payload),
  verifyPayment: (payload) => post("/api/payment/verify", payload),
};
