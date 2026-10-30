import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { site, navigation } from "../data/site";

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
      className={`hm-nav sticky top-0 z-50 ${scrolled ? "is-scrolled" : ""}`}
    >
      <nav className="container-px flex items-center justify-between py-3.5">
        <Link to="/" className="brand-lockup" aria-label={`${site.name} home`}>
          <img src="/brand/logo-mark.svg" alt="" width="48" height="38" className="brand-mark" />
          <span className="brand-name"><strong>{site.shortName}</strong><span className="hm-logo-labs">Labs</span></span>
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
                  className="px-4 py-2 text-sm text-paper/75 hover:text-paper transition rounded-full flex items-center gap-1"
                  aria-expanded={programsOpen}
                >
                  {item.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <AnimatePresence>
                {programsOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: .98 }} transition={{ duration: .18 }} className="absolute left-0 top-full pt-2 w-72">
                    <div className="nav-dropdown card p-2 shadow-card">
                      {item.children.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          className="block rounded-lg px-4 py-2.5 text-sm text-paper hover:bg-surface2 hover:text-violet transition"
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm rounded-full transition ${
                    isActive ? "bg-violet/10 text-violet-deep font-semibold" : "text-paper/75 hover:text-paper"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>

        <div className="hidden lg:block">
          <Link to="/contact" className="hm-nav-cta">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <button
          className="menu-toggle lg:hidden p-2 text-paper"
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

      <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .25 }} className="mobile-menu lg:hidden overflow-y-auto border-t border-line bg-white px-6 pb-6">
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
                  className="block py-2 text-paper/80 pl-2"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={item.to} to={item.to} className="block py-2.5 text-paper/80">
                {item.label}
              </Link>
            )
          )}
          <Link to="/contact" className="btn-primary text-sm mt-4 w-full justify-center">
            Talk to Us
          </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
