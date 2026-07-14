import { createFileRoute } from "@tanstack/react-router";
import { PageTransition } from "@/components/site/PageTransition";
import { SectionReveal } from "@/components/site/SectionReveal";
import { WHATSAPP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE, PHONE_DISPLAY } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Home Baker Islamabad" },
      { name: "description", content: "WhatsApp, call or DM us on Instagram to order your custom cake. Serving Islamabad & Rawalpindi." },
      { property: "og:title", content: "Contact — Home Baker Islamabad" },
      { property: "og:description", content: "WhatsApp, call or DM us on Instagram to place your custom cake order." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageTransition>
      <section className="pt-32 pb-24" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Contact</p>
            <h1 className="mt-4 font-display text-5xl text-[var(--chocolate)] sm:text-6xl">
              Let's bake <em className="not-italic text-gradient-gold">something sweet</em>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-[var(--chocolate-soft)]">
              Send us the vibe, the date and the servings — we'll take it from there. Please allow at least 2 days notice.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-[var(--cream)] pb-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
          {[
            { title: "WhatsApp", value: PHONE_DISPLAY, sub: "Fastest response · order confirmations", href: WHATSAPP_URL, cta: "Chat now" },
            { title: "Instagram", value: INSTAGRAM_HANDLE, sub: "See real cakes & DM us", href: INSTAGRAM_URL, cta: "Open Instagram" },
            { title: "Service Area", value: "Islamabad · Rawalpindi", sub: "Pickup or delivery within the twin cities", href: WHATSAPP_URL, cta: "Ask about delivery" },
          ].map((c, i) => (
            <SectionReveal key={c.title} delay={i * 0.08}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-[var(--gold)]/30 bg-white/60 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:gold-rim"
              >
                <p className="text-xs uppercase tracking-widest text-[var(--gold)]">{c.title}</p>
                <p className="mt-3 font-display text-2xl text-[var(--chocolate)]">{c.value}</p>
                <p className="mt-2 flex-1 text-sm text-[var(--chocolate-soft)]">{c.sub}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--chocolate)] group-hover:text-[var(--gold)]">
                  {c.cta} →
                </span>
              </a>
            </SectionReveal>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-5xl px-6">
          <SectionReveal>
            <div className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--cream-deep)] p-6 text-sm text-[var(--chocolate-soft)]">
              <strong className="text-[var(--chocolate)]">Order policy —</strong> a 50% advance confirms your order.
              Half of the advance is refundable in case of cancellation, to cover ingredients we've already bought.
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}