import { useState } from "react";
import { api } from "../lib/api";
import { loadRazorpayScript } from "../lib/loadRazorpay";
import { fees } from "../data/fees";
import { site } from "../data/site";

const streamOptions = [
  "Computer Science (CSE)",
  "Electronics & Telecommunication (ENTC)",
  "Information Technology (IT)",
  "Mechanical",
  "Civil",
  "Electrical",
  "BCA / BSc Computer Science",
  "BBA / Commerce",
  "Other",
];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  college: "",
  tenthPercentage: "",
  twelfthPercentage: "",
  stream: streamOptions[0],
  level: "Undergraduate",
};

// `context` must match a key in src/data/fees.js and server/config/fees.js
// e.g. "nqt", "data-science", "web-development", "digital-marketing"
export default function RegistrationForm({ context }) {
  const fee = fees[context];
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  if (!fee) {
    return (
      <p className="text-sm text-ember">
        Registration isn't available for this program yet.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Couldn't load the payment window. Check your connection and try again.");
      }

      const order = await api.createOrder({ context, formData: form });

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: site.name,
        description: order.programLabel,
        order_id: order.orderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#7C3AED" },
        handler: async (response) => {
          try {
            await api.verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            setStatus("success");
            setForm(emptyForm);
          } catch (err) {
            setStatus("error");
            setErrorMsg(err.message || "Payment succeeded but confirmation failed. Contact us with your payment ID.");
          }
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });

      razorpay.on("payment.failed", () => {
        setStatus("error");
        setErrorMsg("Payment failed. Please try again.");
      });

      razorpay.open();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto mb-4">
          <circle cx="20" cy="20" r="20" fill="#7C3AED" />
          <path d="M12 21l5 5 11-11" stroke="#fff" strokeWidth="2.4" />
        </svg>
        <h3 className="font-display text-xl font-semibold mb-2">You're registered!</h3>
        <p className="text-paper/70">
          A confirmation with your payment receipt has been sent to your email.
          We'll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card w-full min-w-0 max-w-full p-8 space-y-5">
      <div className="flex items-center justify-between gap-4 rounded-xl bg-surface2 px-5 py-4">
        <div className="min-w-0">
          <p className="text-sm text-paper/70 break-words">{fee.label}</p>
          <p className="text-xs text-muted mt-0.5">Registration fee</p>
        </div>
        <p className="shrink-0 font-mono text-xl font-semibold text-cyan">₹{fee.amount}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-paper/70">Full name</span>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
          />
        </label>
        <label className="block text-sm">
          <span className="text-paper/70">Phone number</span>
          <input
            required
            value={form.phone}
            onChange={update("phone")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
            placeholder="+91 90000 00000"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="text-paper/70">Email address</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={update("email")}
          className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
        />
      </label>

      <label className="block text-sm">
        <span className="text-paper/70">College / institution name</span>
        <input
          required
          value={form.college}
          onChange={update("college")}
          className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-paper/70">10th grade percentage</span>
          <input
            required
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={form.tenthPercentage}
            onChange={update("tenthPercentage")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
          />
        </label>
        <label className="block text-sm">
          <span className="text-paper/70">12th grade percentage</span>
          <input
            required
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={form.twelfthPercentage}
            onChange={update("twelfthPercentage")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-paper/70">Current stream / branch</span>
          <select
            value={form.stream}
            onChange={update("stream")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
          >
            {streamOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-paper/70">Level</span>
          <div className="mt-2 flex gap-2">
            {["Undergraduate", "Postgraduate"].map((l) => (
              <button
                type="button"
                key={l}
                onClick={() => setForm((f) => ({ ...f, level: l }))}
                className={`min-w-0 flex-1 rounded-lg border px-2 py-3 text-xs sm:text-sm transition ${
                  form.level === l
                    ? "border-violet-soft bg-violet/20 text-white"
                    : "border-line bg-surface2 text-paper/70 hover:border-violet-soft"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full min-w-0 justify-center disabled:opacity-60"
      >
        {status === "loading" ? "Opening payment..." : `Register & Pay ₹${fee.amount}`}
      </button>

      <p className="text-xs text-muted text-center">
        You'll be redirected to a secure Razorpay checkout to complete payment.
      </p>

      {status === "error" && <p className="text-sm text-ember">{errorMsg}</p>}
    </form>
  );
}
