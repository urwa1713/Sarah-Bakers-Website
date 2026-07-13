import { WHATSAPP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE, PHONE_DISPLAY } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="relative bg-[var(--chocolate)] pt-20 pb-10 text-[var(--cream)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl">Home Baker <span className="text-gradient-gold">Islamabad</span></div>
          <p className="mt-3 max-w-xs text-sm text-[var(--cream)]/70">Your favourite Islamabadian home baker. Made with pyaar, delivered with care.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--gold)]">Reach us</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-[var(--gold)]" href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp · {PHONE_DISPLAY}</a></li>
            <li><a className="hover:text-[var(--gold)]" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram · {INSTAGRAM_HANDLE}</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--gold)]">Service area</p>
          <p className="mt-3 text-sm text-[var(--cream)]/70">Delivering only within Islamabad & Rawalpindi. Pickup available on request.</p>
          <div className="mt-5 flex gap-3">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-[var(--cream)]/20 transition hover:border-[var(--gold)] hover:text-[var(--gold)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-[var(--cream)]/20 transition hover:border-[var(--gold)] hover:text-[var(--gold)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.7 6L0 24l6.2-1.6A11.9 11.9 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.5-8.5z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-[var(--cream)]/10 px-6 pt-6 text-center text-xs text-[var(--cream)]/50">
        © {new Date().getFullYear()} Home Baker Islamabad · Baked fresh with pyaar
      </div>
    </footer>
  );
}