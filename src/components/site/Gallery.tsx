import { SectionReveal } from "./SectionReveal";
import { CAKES } from "@/lib/site";

export function Gallery() {
  return (
    <section id="gallery" className="bg-[var(--cream)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Gallery</p>
            <h2 className="mt-3 font-display text-4xl text-[var(--chocolate)] sm:text-5xl">Real cakes, real celebrations</h2>
          </div>
        </SectionReveal>

        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {CAKES.map((src, i) => (
            <SectionReveal key={src} delay={(i % 6) * 0.05}>
              <div className="perspective-scene group break-inside-avoid">
                <div
                  className="relative overflow-hidden rounded-2xl bg-[var(--card)] transition-all duration-500 group-hover:-translate-y-2 group-hover:gold-rim"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <img src={src} alt={`Cake ${i + 1}`} className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--chocolate)]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}