import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageTransition } from "@/components/site/PageTransition";
import { PageHeader, Panel } from "@/components/site/OrderUI";
import { ALL_AREAS, DELIVERY_AREAS, formatPKR } from "@/lib/order-config";
import { describe, priceBreakdown, useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Home Baker Islamabad" },
      { name: "description", content: "Review your customised cakes, adjust quantities and see delivery charges before checkout." },
      { property: "og:title", content: "Your Cart — Home Baker Islamabad" },
      { property: "og:description", content: "Review your customised cakes and delivery charges before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQty, subtotal } = useCart();
  const [areaId, setAreaId] = useState("");
  const area = ALL_AREAS.find((a) => a.id === areaId);
  const fee = area?.fee ?? 0;

  if (items.length === 0) {
    return (
      <PageTransition>
        <section className="px-6 pb-24 pt-32">
          <div className="mx-auto max-w-2xl">
            <PageHeader eyebrow="Your cart" title="Nothing sweet in here yet" subtitle="Design a cake and it will show up right here." />
            <div className="mt-10 text-center">
              <Link
                to="/customize"
                className="inline-block rounded-full bg-[var(--chocolate)] px-8 py-4 text-sm uppercase tracking-[0.18em] text-[var(--cream)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
              >
                Build your cake
              </Link>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-6xl">
          <PageHeader eyebrow="Your cart" title="Almost ready to bake" />

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-5">
              {items.map((item) => {
                const { lines } = priceBreakdown(item);
                return (
                  <Panel key={item.id} className="p-0">
                    <div className="flex flex-col gap-5 p-6 sm:flex-row sm:p-7">
                      {item.image && (
                        <img
                          src={item.image}
                          alt="Custom cake"
                          className="h-32 w-full rounded-2xl object-cover sm:h-28 sm:w-28"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <h2 className="font-display text-2xl text-[var(--chocolate)]">Custom Cake</h2>
                        <p className="mt-1 text-sm text-[var(--chocolate-soft)]">{describe(item)}</p>
                        {item.message && (
                          <p className="mt-2 text-sm text-[var(--chocolate-soft)]">
                            <span className="text-[var(--gold)]">Message:</span> “{item.message}”
                          </p>
                        )}
                        {item.notes && (
                          <p className="mt-1 text-sm text-[var(--chocolate-soft)]">
                            <span className="text-[var(--gold)]">Notes:</span> {item.notes}
                          </p>
                        )}

                        <details className="mt-3">
                          <summary className="cursor-pointer text-xs uppercase tracking-[0.18em] text-[var(--gold)]">
                            Price breakdown
                          </summary>
                          <ul className="mt-2 space-y-1">
                            {lines.map((l, i) => (
                              <li key={i} className="flex justify-between text-xs text-[var(--chocolate-soft)]">
                                <span>{l.label}</span>
                                <span className="tabular-nums">{l.amount === 0 ? "—" : formatPKR(l.amount)}</span>
                              </li>
                            ))}
                          </ul>
                        </details>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center rounded-full border border-[var(--chocolate)]/15">
                              <button
                                aria-label="Decrease quantity"
                                onClick={() => setQty(item.id, item.qty - 1)}
                                className="h-9 w-9 rounded-full text-[var(--chocolate)] transition-colors hover:text-[var(--gold)]"
                              >
                                −
                              </button>
                              <span className="w-8 text-center text-sm tabular-nums">{item.qty}</span>
                              <button
                                aria-label="Increase quantity"
                                onClick={() => setQty(item.id, item.qty + 1)}
                                className="h-9 w-9 rounded-full text-[var(--chocolate)] transition-colors hover:text-[var(--gold)]"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => remove(item.id)}
                              className="text-xs uppercase tracking-[0.16em] text-[var(--chocolate-soft)] transition-colors hover:text-[var(--destructive)]"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="font-display text-2xl text-[var(--chocolate)]">
                            {formatPKR(item.unitPrice * item.qty)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Panel>
                );
              })}

              <Link
                to="/customize"
                className="inline-block text-xs uppercase tracking-[0.18em] text-[var(--gold)] hover:underline"
              >
                + Add another cake
              </Link>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <Panel>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]">Order summary</p>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--chocolate-soft)]">Subtotal</span>
                    <span className="tabular-nums">{formatPKR(subtotal)}</span>
                  </div>

                  <div>
                    <label className="mb-2 block text-[var(--chocolate-soft)]" htmlFor="cart-area">
                      Delivery area
                    </label>
                    <select
                      id="cart-area"
                      value={areaId}
                      onChange={(e) => setAreaId(e.target.value)}
                      className="w-full rounded-2xl border border-[var(--chocolate)]/12 bg-card px-4 py-3 text-sm outline-none focus:border-[var(--gold)]"
                    >
                      <option value="">Estimate delivery…</option>
                      {DELIVERY_AREAS.map((c) => (
                        <optgroup key={c.city} label={c.city}>
                          {c.areas.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.label} — {formatPKR(a.fee)}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[var(--chocolate-soft)]">Delivery fee</span>
                    <span className="tabular-nums">{area ? formatPKR(fee) : "—"}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-[var(--chocolate)]/10 pt-5">
                  <span className="text-sm uppercase tracking-[0.2em] text-[var(--chocolate-soft)]">Total</span>
                  <span className="font-display text-4xl text-[var(--chocolate)]">
                    {formatPKR(subtotal + fee)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  search={areaId ? { area: areaId } : {}}
                  className="mt-6 block rounded-full bg-[var(--chocolate)] px-6 py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-[var(--cream)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
                >
                  Proceed to Checkout
                </Link>
              </Panel>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
