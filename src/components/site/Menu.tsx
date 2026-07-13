import { TiltCard } from "./TiltCard";
import { SectionReveal } from "./SectionReveal";
import { CAKES } from "@/lib/site";

const CATEGORIES = [
  { name: "Birthday Cakes", tag: "Signature", desc: "Custom names, colours & candles.", img: CAKES[1] },
  { name: "Anniversary Cakes", tag: "Romantic", desc: "Elegant tiers for two hearts.", img: CAKES[2] },
  { name: "Cupcakes", tag: "Boxed set", desc: "Hand-piped, message-topped mini bakes.", img: CAKES[3] },
  { name: "Themed Kids' Cakes", tag: "Playful", desc: "Cartoons, hobbies & silly diva vibes.", img: CAKES[5] },
  { name: "Custom Cakes", tag: "Bespoke", desc: "Bring the idea, we bake the rest.", img: CAKES[9] },
];

export function Menu() {
  return (
    <section id="menu" className="relative bg-[var(--cream-deep)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">The Menu</p>
            <h2 className="mt-3 font-display text-4xl text-[var(--chocolate)] sm:text-5xl">Sweet little categories</h2>
            <p className="mt-4 max-w-xl text-[var(--chocolate-soft)]">Every order is custom-baked. Pick a category to start the conversation.</p>
          </div>
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <SectionReveal key={c.name} delay={i * 0.06}>
              <TiltCard className="overflow-hidden">
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img src={c.img} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--chocolate)]/60 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--cream)]/90 px-3 py-1 text-[10px] uppercase tracking-widest text-[var(--chocolate)]">{c.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-[var(--chocolate)]">{c.name}</h3>
                  <p className="mt-2 text-sm text-[var(--chocolate-soft)]">{c.desc}</p>
                </div>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}