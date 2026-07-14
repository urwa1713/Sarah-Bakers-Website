import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/site";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[var(--cream)]/85 backdrop-blur shadow-[0_10px_30px_-20px_rgba(59,42,34,0.35)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl tracking-tight text-[var(--chocolate)]">
          Home Baker <span className="text-gradient-gold">Islamabad</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="text-xs uppercase tracking-[0.2em] text-[var(--chocolate-soft)] transition-colors hover:text-[var(--gold)] data-[status=active]:text-[var(--chocolate)]"
            >
              {l.label}
            </Link>
          ))}
          <div className="group relative">
            <button className="text-xs uppercase tracking-[0.2em] text-[var(--chocolate-soft)] hover:text-[var(--gold)]">
              Categories ▾
            </button>
            <div className="invisible absolute right-0 top-full mt-3 w-64 rounded-2xl border border-[var(--gold)]/25 bg-[var(--cream)] p-2 opacity-0 shadow-[var(--shadow-soft)] transition-all group-hover:visible group-hover:opacity-100">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="block rounded-xl px-4 py-2.5 text-sm text-[var(--chocolate)] transition-colors hover:bg-[var(--cream-deep)] hover:text-[var(--gold)]"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-[var(--chocolate)]/15 bg-white/60 text-[var(--chocolate)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--gold)]/20 bg-[var(--cream)] px-6 py-4">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                className="rounded-lg px-3 py-2.5 text-sm text-[var(--chocolate)] hover:bg-[var(--cream-deep)] data-[status=active]:text-[var(--gold)]"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-[var(--chocolate)]/10 pt-2">
              <p className="px-3 py-1 text-[10px] uppercase tracking-widest text-[var(--gold)]">Categories</p>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="block rounded-lg px-3 py-2 text-sm text-[var(--chocolate-soft)] hover:bg-[var(--cream-deep)]"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}