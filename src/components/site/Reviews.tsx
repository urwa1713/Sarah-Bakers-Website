import { SectionReveal } from "./SectionReveal";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/site";

export function Reviews() {
  return (
    <section id="reviews" className="bg-[var(--cream)] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionReveal>
          <div className="perspective-scene">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-[2rem] border border-[var(--gold)]/40 bg-white/60 p-10 text-center backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:gold-rim md:p-16"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 20%, oklch(0.735 0.106 78 / 0.15), transparent 60%)" }} />
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Loved by our customers</p>
              <div
                className="mx-auto mt-8 flex h-24 w-24 items-center justify-center rounded-3xl text-white shadow-[0_20px_40px_-10px_rgba(200,80,120,0.5)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg,#feda75 0%,#fa7e1e 25%,#d62976 50%,#962fbf 75%,#4f5bd5 100%)",
                  transform: "rotateY(-8deg) rotateX(6deg)",
                }}
              >
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </div>
              <h2 className="mt-8 font-display text-3xl leading-tight text-[var(--chocolate)] sm:text-4xl">
                See what our customers are <em className="not-italic text-gradient-gold">actually saying</em>.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[var(--chocolate-soft)]">
                Real reviews, real photos, real cake-tears — all on our Instagram.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--chocolate)] px-7 py-3.5 text-sm font-medium text-[var(--cream)] transition-transform group-hover:scale-105">
                Visit {INSTAGRAM_HANDLE} →
              </div>
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}