import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PageTransition } from "@/components/site/PageTransition";
import { SectionReveal } from "@/components/site/SectionReveal";
import { Lightbox } from "@/components/site/Lightbox";
import { CATEGORIES, getCategory, WHATSAPP_URL } from "@/lib/site";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Collection not found — Home Baker Islamabad" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.name} — Home Baker Islamabad` },
        { name: "description", content: category.long },
        { property: "og:title", content: `${category.name} — Home Baker Islamabad` },
        { property: "og:description", content: category.long },
        { property: "og:image", content: category.cover },
        { name: "twitter:image", content: category.cover },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: NotFound,
  errorComponent: ({ reset }) => (
    <div className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl text-[var(--chocolate)]">Something went wrong</h1>
        <button onClick={reset} className="mt-4 rounded-full bg-[var(--chocolate)] px-6 py-2 text-sm text-[var(--cream)]">Try again</button>
      </div>
    </div>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const [active, setActive] = useState<number | null>(null);
  const others = CATEGORIES.filter((c) => c.slug !== category.slug);

  return (
    <PageTransition>
      <section className="relative isolate overflow-hidden pt-32 pb-16" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <Link to="/" className="text-xs uppercase tracking-widest text-[var(--gold)] hover:underline">← All collections</Link>
            <p className="mt-6 text-xs uppercase tracking-[0.28em] text-[var(--gold)]">{category.tag}</p>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] text-[var(--chocolate)] sm:text-6xl">{category.name}</h1>
            <p className="mt-5 max-w-md text-[var(--chocolate-soft)] leading-relaxed">{category.long}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--chocolate)] px-6 py-3.5 text-sm font-medium text-[var(--cream)]"
            >
              Order a {category.name.toLowerCase()} →
            </a>
          </div>
          <div className="perspective-scene">
            <div className="overflow-hidden rounded-[2rem] gold-rim" style={{ transform: "rotateY(-6deg) rotateX(4deg)" }}>
              <img src={category.cover} alt={category.name} className="h-[420px] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.images.map((src: string, i: number) => (
              <SectionReveal key={src} delay={(i % 6) * 0.05}>
                <button onClick={() => setActive(i)} className="perspective-scene group block w-full text-left">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--card)] transition-all duration-500 group-hover:-translate-y-2 group-hover:gold-rim" style={{ boxShadow: "var(--shadow-soft)" }}>
                    <img src={src} alt={`${category.name} ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--chocolate)]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-[var(--cream)]/90 px-3 py-1 text-[10px] uppercase tracking-widest text-[var(--chocolate)] opacity-0 transition-opacity group-hover:opacity-100">
                      Tap to expand
                    </div>
                  </div>
                </button>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream-deep)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Explore more</p>
          <h2 className="mt-3 font-display text-3xl text-[var(--chocolate)] sm:text-4xl">Other collections</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="group relative block h-48 overflow-hidden rounded-2xl"
              >
                <img src={c.cover} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--chocolate)]/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--gold)]">{c.tag}</p>
                  <p className="mt-1 font-display text-xl text-[var(--cream)]">{c.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={category.images} index={active} onClose={() => setActive(null)} onNav={setActive} />
    </PageTransition>
  );
}

function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-widest text-[var(--gold)]">404</p>
        <h1 className="mt-3 font-display text-4xl text-[var(--chocolate)]">Collection not found</h1>
        <Link to="/" className="mt-6 inline-block rounded-full bg-[var(--chocolate)] px-6 py-3 text-sm text-[var(--cream)]">Back home</Link>
      </div>
    </div>
  );
}