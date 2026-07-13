import { SectionReveal } from "./SectionReveal";
import { CAKES } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="relative bg-[var(--cream)] py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
        <SectionReveal>
          <div className="perspective-scene">
            <div
              className="relative overflow-hidden rounded-[2rem] gold-rim"
              style={{ transform: "rotateY(-6deg) rotateX(4deg)" }}
            >
              <img src={CAKES[0]} alt="A layered cake by Home Baker Islamabad" className="h-[520px] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--chocolate)]/40 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full bg-[var(--cream)]/90 px-4 py-2 text-xs uppercase tracking-widest text-[var(--chocolate)] backdrop-blur">Made with pyaar</div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">About</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-[var(--chocolate)] sm:text-5xl">
            A tiny home kitchen, <em className="not-italic text-gradient-gold">big flavour stories</em>.
          </h2>
          <p className="mt-6 text-[var(--chocolate-soft)] leading-relaxed">
            I'm Sarah — a passionate home baker from Islamabad. Every cake that leaves my kitchen is
            hand-piped, freshly baked to order, and made only for one family at a time. No factory batches,
            no shortcuts — just butter, sugar and a lot of love.
          </p>
          <p className="mt-4 text-[var(--chocolate-soft)] leading-relaxed">
            We proudly serve <strong className="text-[var(--chocolate)]">Islamabad & Rawalpindi only</strong>,
            so every dessert arrives at its best.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[["500+", "Cakes baked"], ["4.9★", "Insta reviews"], ["2 cities", "Isb · Pindi"]].map(([n, l]) => (
              <div key={l} className="rounded-xl border border-[var(--gold)]/30 bg-white/50 px-3 py-4 backdrop-blur">
                <div className="font-display text-2xl text-[var(--chocolate)]">{n}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-[var(--chocolate-soft)]">{l}</div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}