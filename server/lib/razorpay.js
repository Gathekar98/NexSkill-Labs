function getCredentials() {
  return {
    keyId: (process.env.RAZORPAY_KEY_ID || "").trim(),
    keySecret: (process.env.RAZORPAY_KEY_SECRET || "").trim(),
  };
}

function isConfigured() {
  const { keyId, keySecret } = getCredentials();
  return /^rzp_(test|live)_[A-Za-z0-9]+$/.test(keyId) &&
    Boolean(keySecret) && !/^(your[-_]|<)/i.test(keySecret);
}

async function createOrder(orderData) {
  if (!isConfigured()) {
    throw new Error("Razorpay credentials are not configured.");
  }

  const { keyId, keySecret } = getCredentials();
  const credentials = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
    signal: AbortSignal.timeout(15000),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(
      payload.error?.description || payload.error?.reason || "Razorpay order creation failed."
    );
    error.statusCode = response.status;
    error.error = payload.error || {};
    throw error;
  }

  return payload;
}

module.exports = { createOrder, isConfigured, getCredentials };
