import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/site";
import { SectionReveal } from "./SectionReveal";
import { TiltCard } from "./TiltCard";

export function CategoryCards() {
  return (
    <section id="categories" className="relative bg-[var(--cream-deep)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Our Collections</p>
            <h2 className="mt-3 font-display text-4xl text-[var(--chocolate)] sm:text-5xl">
              Choose your <em className="not-italic text-gradient-gold">flavour</em> of celebration
            </h2>
            <p className="mt-4 max-w-xl text-[var(--chocolate-soft)]">
              Tap a category to explore the full gallery.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <SectionReveal key={c.slug} delay={i * 0.06}>
              <Link
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="block h-full"
              >
                <TiltCard className="h-full overflow-hidden">
                  <div className="relative h-56 overflow-hidden rounded-t-2xl">
                    <img src={c.cover} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--chocolate)]/70 via-[var(--chocolate)]/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-[var(--cream)]/90 px-3 py-1 text-[10px] uppercase tracking-widest text-[var(--chocolate)]">{c.tag}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-[var(--chocolate)]">{c.name}</h3>
                    <p className="mt-2 text-sm text-[var(--chocolate-soft)]">{c.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--gold)]">
                      View gallery →
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}