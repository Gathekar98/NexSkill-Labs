import { useState } from "react";
import { api } from "../lib/api";
import { programs } from "../data/programs";

const programOptions = [...Object.values(programs).map((program) => program.title), "General application", "Other"];
const createEmptyForm = (program) => ({ name: "", email: "", phone: "", program, message: "" });

export default function ApplicationForm({ defaultProgram = programOptions[0] }) {
  const initialProgram = programOptions.includes(defaultProgram) ? defaultProgram : "General application";
  const [form, setForm] = useState(() => createEmptyForm(initialProgram));
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await api.register(form);
      setStatus("success");
      setForm(createEmptyForm(initialProgram));
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card w-full min-w-0 max-w-full p-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">Name</span>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none placeholder:text-muted focus:border-violet"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none placeholder:text-muted focus:border-violet"
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">Phone number</span>
          <input
            value={form.phone}
            onChange={update("phone")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none placeholder:text-muted focus:border-violet"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Program</span>
          <select
            value={form.program}
            onChange={update("program")}
            className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none focus:border-violet"
          >
            {programOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-muted">Anything else we should know?</span>
        <textarea
          rows={4}
          value={form.message}
          onChange={update("message")}
          className="mt-2 w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-paper outline-none placeholder:text-muted focus:border-violet"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center sm:w-auto disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : "Submit Application"}
      </button>
      {status === "success" && (
        <p className="text-sm text-cyan" role="status" aria-live="polite">Application received — we'll be in touch.</p>
      )}
      {status === "error" && <p className="text-sm text-ember">{errorMsg}</p>}
    </form>
  );
}
