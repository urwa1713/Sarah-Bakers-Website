import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PageTransition } from "@/components/site/PageTransition";
import { FieldLabel, OptionButton, PageHeader, Panel, inputClass } from "@/components/site/OrderUI";
import {
  FLAVOURS,
  FROSTINGS,
  SHAPES,
  SIZES,
  TOPPINGS,
  ADVANCE_NOTE,
  MIN_NOTICE_HOURS,
  formatPKR,
} from "@/lib/order-config";
import { DEFAULT_CONFIG, priceBreakdown, useCart, type CakeConfig } from "@/lib/cart";
import { CAKES } from "@/lib/site";

type Search = { img?: string; category?: string };

export const Route = createFileRoute("/customize")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    img: typeof search['img'] === "string" ? search['img'] : undefined,
    category: typeof search['category'] === "string" ? search['category'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Build Your Cake — Home Baker Islamabad" },
      {
        name: "description",
        content:
          "Design your own custom cake: pick size, shape, flavour, frosting and toppings, and watch the price update live. Delivery across Islamabad & Rawalpindi.",
      },
      { property: "og:title", content: "Build Your Cake — Home Baker Islamabad" },
      {
        property: "og:description",
        content: "Pick size, shape, flavour, frosting and toppings with live pricing, then order on WhatsApp.",
      },
    ],
  }),
  component: CustomizePage,
});

function CustomizePage() {
  const { img, category } = Route.useSearch();
  const navigate = useNavigate();
  const { add } = useCart();

  const [cfg, setCfg] = useState<CakeConfig>({
    ...DEFAULT_CONFIG,
    image: img ?? CAKES[1],
    categoryName: category,
  });

  const { lines, total } = useMemo(() => priceBreakdown(cfg), [cfg]);

  const set = <K extends keyof CakeConfig>(key: K, value: CakeConfig[K]) =>
    setCfg((c) => ({ ...c, [key]: value }));

  const toggleTopping = (id: string) =>
    setCfg((c) => ({
      ...c,
      toppings: c.toppings.includes(id) ? c.toppings.filter((t) => t !== id) : [...c.toppings, id],
    }));

  const addToCart = () => {
    add(cfg);
    toast.success("Added to your cart", { description: `${formatPKR(total)} · ${SIZES.find((s) => s.id === cfg.size)?.label}` });
    void navigate({ to: "/cart" });
  };

  return (
    <PageTransition>
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="Build your cake"
            title={
              <>
                Your cake, <em className="not-italic text-gradient-gold">exactly</em> your way
              </>
            }
            subtitle="Choose everything from weight to toppings — the price updates as you go."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.55fr_1fr]">
            {/* Options */}
            <div className="space-y-6">
              <Panel>
                <FieldLabel hint="Base price">Size / Weight</FieldLabel>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {SIZES.map((s) => (
                    <OptionButton
                      key={s.id}
                      active={cfg.size === s.id}
                      onClick={() => set("size", s.id)}
                      label={s.label}
                      price={s.price}
                    />
                  ))}
                </div>
              </Panel>

              <Panel>
                <FieldLabel>Shape</FieldLabel>
                <div className="grid grid-cols-3 gap-3">
                  {SHAPES.map((s) => (
                    <OptionButton
                      key={s.id}
                      active={cfg.shape === s.id}
                      onClick={() => set("shape", s.id)}
                      label={s.label}
                      price={s.price}
                    />
                  ))}
                </div>
              </Panel>

              <Panel>
                <FieldLabel>Flavour</FieldLabel>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {FLAVOURS.map((f) => (
                    <OptionButton
                      key={f.id}
                      active={cfg.flavour === f.id}
                      onClick={() => set("flavour", f.id)}
                      label={f.label}
                      price={f.price}
                    />
                  ))}
                </div>
              </Panel>

              <Panel>
                <FieldLabel>Frosting / Finish</FieldLabel>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {FROSTINGS.map((f) => (
                    <OptionButton
                      key={f.id}
                      active={cfg.frosting === f.id}
                      onClick={() => set("frosting", f.id)}
                      label={f.label}
                      price={f.price}
                    />
                  ))}
                </div>
              </Panel>

              <Panel>
                <FieldLabel hint="Choose as many as you like">Toppings & add-ons</FieldLabel>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {TOPPINGS.map((t) => (
                    <OptionButton
                      key={t.id}
                      active={cfg.toppings.includes(t.id)}
                      onClick={() => toggleTopping(t.id)}
                      label={t.label}
                      price={t.price}
                    />
                  ))}
                </div>
              </Panel>

              <Panel>
                <FieldLabel hint="Optional">Message on cake</FieldLabel>
                <input
                  className={inputClass}
                  maxLength={120}
                  placeholder="e.g. Happy Birthday Ayesha!"
                  value={cfg.message}
                  onChange={(e) => set("message", e.target.value)}
                />

                <div className="mt-6">
                  <FieldLabel hint="Optional">Additional notes</FieldLabel>
                  <textarea
                    className={`${inputClass} min-h-32 resize-y`}
                    maxLength={1000}
                    placeholder="Less sweet, no nuts, colour theme, reference photo description…"
                    value={cfg.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </div>
              </Panel>
            </div>

            {/* Live price */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="perspective-scene">
                <motion.div
                  initial={{ opacity: 0, rotateX: 8, y: 20 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Panel className="overflow-hidden p-0">
                    {cfg.image && (
                      <div className="relative h-52 overflow-hidden">
                        <img src={cfg.image} alt="Your selected cake style" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--chocolate)]/70 to-transparent" />
                        <p className="absolute bottom-4 left-5 font-display text-2xl text-[var(--cream)]">
                          Your creation
                        </p>
                      </div>
                    )}

                    <div className="p-6 sm:p-8">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]">Price breakdown</p>
                      <ul className="mt-4 space-y-2.5">
                        {lines.map((l, i) => (
                          <li key={`${l.label}-${i}`} className="flex items-baseline justify-between gap-4 text-sm">
                            <span className="text-[var(--chocolate-soft)]">{l.label}</span>
                            <span className="tabular-nums text-[var(--chocolate)]">
                              {l.amount === 0 ? "—" : formatPKR(l.amount)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 border-t border-[var(--chocolate)]/10 pt-5">
                        <div className="flex items-end justify-between">
                          <span className="text-sm uppercase tracking-[0.2em] text-[var(--chocolate-soft)]">Total</span>
                          <motion.span
                            key={total}
                            initial={{ scale: 0.94, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            className="font-display text-4xl text-[var(--chocolate)]"
                          >
                            {formatPKR(total)}
                          </motion.span>
                        </div>
                        <p className="mt-2 text-[11px] text-[var(--chocolate-soft)]/80">
                          Delivery is added at checkout, based on your area.
                        </p>
                      </div>

                      <button
                        onClick={addToCart}
                        className="mt-6 w-full rounded-full bg-[var(--chocolate)] px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--cream)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
                      >
                        Add to Cart — {formatPKR(total)}
                      </button>

                      <p className="mt-4 text-[11px] leading-relaxed text-[var(--chocolate-soft)]/80">
                        {ADVANCE_NOTE} Minimum {MIN_NOTICE_HOURS} hours notice needed.
                      </p>
                    </div>
                  </Panel>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
