import { motion } from "framer-motion";
import { Cake3D } from "./Cake3D";
import { Particles } from "./Particles";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <Particles count={26} />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full border border-[var(--gold)]/20" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full border border-[var(--rose)]/25" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-20 pt-28 md:grid-cols-2 md:pt-32 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 md:order-1"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-white/40 px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-[var(--chocolate-soft)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            Islamabad · Rawalpindi
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-[var(--chocolate)] sm:text-6xl md:text-7xl">
            Your favourite <em className="text-gradient-gold not-italic">Islamabadian</em> home baker
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--chocolate-soft)] sm:text-lg">
            Boutique cakes, cupcakes & sweet little things — baked fresh to order, one pyaar-filled batch at a time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full bg-[var(--chocolate)] px-6 py-3.5 text-sm font-medium text-[var(--cream)] shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon /> Order on WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--chocolate)]/20 bg-white/60 px-6 py-3.5 text-sm font-medium text-[var(--chocolate)] backdrop-blur transition-all hover:border-[var(--gold)] hover:-translate-y-0.5"
            >
              <InstaIcon /> DM on Instagram
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-widest text-[var(--chocolate-soft)]/70">
            <div><span className="mr-2 font-display text-2xl text-[var(--gold)]">2</span>days notice</div>
            <div className="h-6 w-px bg-[var(--chocolate)]/15" />
            <div><span className="mr-2 font-display text-2xl text-[var(--gold)]">100%</span>homemade</div>
          </div>
        </motion.div>

        <div className="order-1 md:order-2">
          <Cake3D />
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.7 6L0 24l6.2-1.6A11.9 11.9 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.5-8.5zM12 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A10 10 0 1 1 22 12a10 10 0 0 1-10 10zm5.5-7.5c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.5s-.7-1.7-1-2.3-.5-.5-.7-.5h-.6c-.2 0-.5 0-.8.4a3 3 0 0 0-1 2.3c0 1.4 1 2.7 1.1 2.9s2 3.1 4.9 4.4c.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4z"/>
    </svg>
  );
}
function InstaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
}