import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageTransition } from "@/components/site/PageTransition";
import { SectionReveal } from "@/components/site/SectionReveal";
import { Lightbox } from "@/components/site/Lightbox";
import { CAKES, CATEGORIES } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Home Baker Islamabad" },
      { name: "description", content: "Browse real cakes we've baked — wedding, birthday, custom treats and seasonal specials." },
      { property: "og:title", content: "Gallery — Home Baker Islamabad" },
      { property: "og:description", content: "Real cakes, real celebrations. Explore our full portfolio." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <PageTransition>
      <section className="pt-32 pb-12" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Gallery</p>
          <h1 className="mt-4 font-display text-5xl text-[var(--chocolate)] sm:text-6xl">
            Every cake, <em className="not-italic text-gradient-gold">every celebration</em>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--chocolate-soft)]">
            Tap any photo to open it. Or jump into a specific collection below.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="rounded-full border border-[var(--gold)]/40 bg-white/60 px-4 py-2 text-xs uppercase tracking-widest text-[var(--chocolate)] transition hover:bg-[var(--gold)]/20"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {CAKES.map((src, i) => (
              <SectionReveal key={src} delay={(i % 6) * 0.04}>
                <button onClick={() => setActive(i)} className="perspective-scene group block w-full break-inside-avoid text-left">
                  <div className="relative overflow-hidden rounded-2xl bg-[var(--card)] transition-all duration-500 group-hover:-translate-y-2 group-hover:gold-rim" style={{ boxShadow: "var(--shadow-soft)" }}>
                    <img src={src} alt={`Cake ${i + 1}`} className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" loading="lazy" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--chocolate)]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </button>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={CAKES} index={active} onClose={() => setActive(null)} onNav={setActive} />
    </PageTransition>
  );
}