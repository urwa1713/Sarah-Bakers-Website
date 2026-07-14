import { createFileRoute, Link } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { PageTransition } from "@/components/site/PageTransition";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CAKES, WHATSAPP_URL } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Home Baker Islamabad" },
      { name: "description", content: "Meet Sarah, the home baker behind Home Baker Islamabad. Small-batch, hand-piped cakes made from a home kitchen in Islamabad." },
      { property: "og:title", content: "About — Home Baker Islamabad" },
      { property: "og:description", content: "Small-batch, hand-piped cakes made with pyaar from a home kitchen in Islamabad." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageTransition>
      <PageHeader eyebrow="About" title="Baked from a home kitchen, made for your table" cover={CAKES[3]} />
      <About />
      <section className="bg-[var(--cream-deep)] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Why home-baked</p>
            <h2 className="mt-3 font-display text-4xl text-[var(--chocolate)] sm:text-5xl">
              One family, one cake, <em className="not-italic text-gradient-gold">one day</em> at a time.
            </h2>
            <p className="mt-6 text-[var(--chocolate-soft)] leading-relaxed">
              We deliberately keep orders small so every cake gets the attention it deserves — real butter,
              real cream, hand-piped decor, and never rushed. If you can taste it, we made it right.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--chocolate)] px-7 py-3.5 text-sm font-medium text-[var(--cream)]"
            >
              Start your order →
            </a>
            <div className="mt-6">
              <Link to="/gallery" className="text-xs uppercase tracking-widest text-[var(--gold)] hover:underline">
                Or browse the gallery →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

function PageHeader({ eyebrow, title, cover }: { eyebrow: string; title: string; cover: string }) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16" style={{ background: "var(--gradient-hero)" }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">{eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-[var(--chocolate)] sm:text-6xl">{title}</h1>
        </div>
        <div className="perspective-scene">
          <div className="overflow-hidden rounded-[2rem] gold-rim" style={{ transform: "rotateY(-6deg) rotateX(4deg)" }}>
            <img src={cover} alt="" className="h-[380px] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}