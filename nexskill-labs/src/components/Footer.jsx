import { Link } from "react-router-dom";
import { useState } from "react";
import { site, footerLinks } from "../data/site";
import { api } from "../lib/api";

const socialIcons = {
  facebook: (
    <path d="M13 22V12h3l.5-4H13V6c0-1.1.3-1.8 1.9-1.8H16V.8C15.6.7 14.5.6 13.2.6 10.6.6 8.8 2.2 8.8 5.4V8H6v4h2.8v10h4.2Z" />
  ),
  instagram: (
    <path d="M8 2h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Zm0 2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8Zm4 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM17.8 6a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 17.8 6Z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.9-2 3.9-2 4.2 0 5 2.8 5 6.3V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
  ),
  youtube: (
    <path d="M23 12s0-3.4-.4-5a3 3 0 0 0-2.1-2.1C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.5.4A3 3 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a3 3 0 0 0 2.1 2.1c1.6.4 8.5.4 8.5.4s6.9 0 8.5-.4A3 3 0 0 0 22.6 17c.4-1.6.4-5 .4-5ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
  ),
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.subscribe(email);
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-px grid gap-10 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold">{site.shortName}</p>
          <p className="font-display text-sm text-muted mb-4">Labs.</p>
          <p className="text-sm text-paper/70 mb-5">{site.tagline}</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-full border border-line bg-surface2 px-4 py-2 text-sm outline-none focus:border-violet-soft"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-violet px-4 py-2 text-sm font-semibold hover:bg-violet-soft hover:text-ink transition"
            >
              Join
            </button>
          </form>
          {subscribed && (
            <p className="mt-2 text-xs text-cyan">Thanks — you're on the list.</p>
          )}
          {error && <p className="mt-2 text-xs text-ember">{error}</p>}
        </div>

        <div>
          <p className="eyebrow mb-4">Categories</p>
          <ul className="space-y-2 text-sm text-paper/75">
            {footerLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-cyan transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Get in touch</p>
          <ul className="space-y-2 text-sm text-paper/75">
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-cyan transition">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="hover:text-cyan transition">
                {site.contact.phone}
              </a>
            </li>
            <li className="text-paper/60">
              {site.contact.addressLines.join(" ")}
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Social</p>
          <div className="flex gap-3">
            {Object.entries(site.social).map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={key}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-paper/70 hover:text-cyan hover:border-cyan transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  {socialIcons[key]}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-px flex flex-col gap-3 py-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/terms" className="hover:text-cyan transition">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-cyan transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
