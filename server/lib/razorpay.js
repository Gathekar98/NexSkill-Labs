function isConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

async function createOrder(orderData) {
  if (!isConfigured()) {
    throw new Error("Razorpay credentials are not configured.");
  }

  const credentials = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString("base64");

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

module.exports = { createOrder, isConfigured };
