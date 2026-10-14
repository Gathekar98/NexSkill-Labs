// Local requests use Vite's /api proxy. Production requires the Render
// backend origin in VITE_API_URL at build time.
const API_URL = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");

async function post(path, body) {
  if (import.meta.env.PROD && !API_URL) {
    throw new Error("Registration is unavailable because the server address is not configured. Please contact us.");
  }
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not connect to the registration server. Please try again shortly.");
  }
  const data = await res.json().catch(() => null);
  if (!data) {
    throw new Error("The registration server returned an invalid response. Please contact us.");
  }
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
