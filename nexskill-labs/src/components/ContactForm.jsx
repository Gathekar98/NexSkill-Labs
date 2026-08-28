import { useState } from "react";
import { api } from "../lib/api";

// Submits to the backend (server/index.js -> POST /api/contact).
// The API sends a notification email and stores the lead.

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await api.contact(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card w-full min-w-0 max-w-full p-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-paper/70">Name</span>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
            placeholder="Your full name"
          />
        </label>
        <label className="block text-sm">
          <span className="text-paper/70">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-paper/70">Phone number</span>
        <input
          value={form.phone}
          onChange={update("phone")}
          className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
          placeholder="+91 90000 00000"
        />
      </label>
      <label className="block text-sm">
        <span className="text-paper/70">Message</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet-soft"
          placeholder="Tell us what you're looking for..."
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center sm:w-auto disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-cyan">Thanks — we've received your message and will be in touch.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-ember">{errorMsg || "Something went wrong. Please try again."}</p>
      )}
    </form>
  );
}
