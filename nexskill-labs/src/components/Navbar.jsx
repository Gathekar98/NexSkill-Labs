import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site, navigation } from "../data/site";

function NodeMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="15" cy="6" r="3" fill="#22D3EE" />
      <circle cx="6" cy="22" r="3" fill="#A78BFA" />
      <circle cx="24" cy="22" r="3" fill="#F472B6" />
      <path
        d="M15 9 L6 19 M15 9 L24 19 M8 22 L22 22"
        stroke="#7C3AED"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProgramsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? "bg-ink/90 backdrop-blur border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="container-px flex items-center justify-between h-18 py-4">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
          <NodeMark />
          {site.name}
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setProgramsOpen(true)}
                onMouseLeave={() => setProgramsOpen(false)}
              >
                <button
                  className="px-4 py-2 text-sm text-paper/85 hover:text-white transition rounded-full flex items-center gap-1"
                  aria-expanded={programsOpen}
                >
                  {item.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                {programsOpen && (
                  <div className="absolute left-0 top-full pt-2 w-64">
                    <div className="card p-2 shadow-card">
                      {item.children.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          className="block rounded-lg px-4 py-2.5 text-sm text-paper/85 hover:bg-surface2 hover:text-cyan transition"
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm rounded-full transition ${
                    isActive ? "text-cyan" : "text-paper/85 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary text-sm py-2.5">
            Talk to Us
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-paper"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            {open ? (
              <path d="M6 6L20 20M20 6L6 20" stroke="currentColor" strokeWidth="2" />
            ) : (
              <path d="M4 8H22M4 13H22M4 18H22" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-line bg-ink px-6 pb-6">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.label} className="py-2">
                <p className="text-xs uppercase tracking-widest text-muted mt-3 mb-1">
                  {item.label}
                </p>
                {item.children.map((c) => (
                  <Link
                    key={c.to}
                    to={c.to}
                    className="block py-2 text-paper/90 pl-2"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={item.to} to={item.to} className="block py-2.5 text-paper/90">
                {item.label}
              </Link>
            )
          )}
          <Link to="/contact" className="btn-primary text-sm mt-4 w-full justify-center">
            Talk to Us
          </Link>
        </div>
      )}
    </header>
  );
}
