import { SectionReveal } from "./SectionReveal";
import { TiltCard } from "./TiltCard";

const STEPS = [
  { n: "01", title: "Message us", body: "Ping on WhatsApp or slide into our Instagram DMs with your idea, date & servings." },
  { n: "02", title: "Confirm design & date", body: "We agree on flavour, decor and pickup/delivery. Minimum 2 days notice, please." },
  { n: "03", title: "Pay half, pick up sweet", body: "50% advance to lock the date. Pickup or delivery within Islamabad & Rawalpindi." },
];

export function HowToOrder() {
  return (
    <section id="order" className="relative bg-[var(--chocolate)] py-24 text-[var(--cream)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 20% 10%, oklch(0.735 0.106 78 / 0.25), transparent 40%), radial-gradient(circle at 80% 90%, oklch(0.756 0.055 25 / 0.2), transparent 40%)" }} />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionReveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">How to order</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Three sweet steps</h2>
          </div>
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <SectionReveal key={s.n} delay={i * 0.1}>
              <TiltCard className="h-full bg-[var(--chocolate-soft)]/40 backdrop-blur">
                <div className="p-8">
                  <div className="font-display text-5xl text-gradient-gold">{s.n}</div>
                  <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--cream)]/75">{s.body}</p>
                </div>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-[var(--gold)]/30 bg-[var(--cream)]/5 p-6 text-sm text-[var(--cream)]/80 backdrop-blur">
            <strong className="text-[var(--gold)]">Booking policy —</strong> a 50% advance confirms your order.
            In case of cancellation, half of the advance is refunded so we can cover already-purchased ingredients.
            Fair for both of us, pinky-promise.
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}