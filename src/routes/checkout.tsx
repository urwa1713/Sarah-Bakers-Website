import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { PageTransition } from "@/components/site/PageTransition";
import { FieldLabel, PageHeader, Panel, inputClass } from "@/components/site/OrderUI";
import {
  ADVANCE_NOTE,
  ALL_AREAS,
  DELIVERY_AREAS,
  MIN_NOTICE_HOURS,
  PAYMENT_METHODS,
  TIME_SLOTS,
  formatPKR,
  minDeliveryDate,
} from "@/lib/order-config";
import { describe, useCart } from "@/lib/cart";
import { placeOrder } from "@/lib/orders.functions";
import { supabase } from "@/integrations/supabase/client";

type Search = { area?: string };

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    area: typeof search['area'] === "string" ? search['area'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Checkout — Home Baker Islamabad" },
      { name: "description", content: "Add your delivery details, pick a date and time slot, and choose how you'd like to pay." },
      { property: "og:title", content: "Checkout — Home Baker Islamabad" },
      { property: "og:description", content: "Delivery details and payment for your custom cake order." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { area: presetArea } = Route.useSearch();
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const submit = useServerFn(placeOrder);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    area: presetArea ?? "",
    deliveryDate: minDeliveryDate(),
    deliverySlot: TIME_SLOTS[0].id,
    orderNotes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [proof, setProof] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const method = PAYMENT_METHODS.find((m) => m.id === paymentMethod)!;
  const area = ALL_AREAS.find((a) => a.id === form.area);
  const fee = area?.fee ?? 0;
  const total = subtotal + fee;

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (items.length === 0) {
    return (
      <PageTransition>
        <section className="px-6 pb-24 pt-32 text-center">
          <PageHeader eyebrow="Checkout" title="Your cart is empty" subtitle="Add a cake before checking out." />
          <Link
            to="/customize"
            className="mt-8 inline-block rounded-full bg-[var(--chocolate)] px-8 py-4 text-sm uppercase tracking-[0.18em] text-[var(--cream)]"
          >
            Build your cake
          </Link>
        </section>
      </PageTransition>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!area) {
      toast.error("Please pick your delivery area.");
      return;
    }
    if (method.needsProof && !proof) {
      toast.error("Please upload your payment screenshot.");
      return;
    }
    setBusy(true);
    try {
      let proofPath = "";
      if (proof) {
        const ext = proof.name.split(".").pop() ?? "png";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage.from("payment-proofs").upload(path, proof, {
          contentType: proof.type || "image/png",
        });
        if (error) throw new Error("We couldn't upload your screenshot. Please try again.");
        proofPath = path;
      }

      const result = await submit({
        data: {
          ...form,
          paymentMethod,
          paymentProofPath: proofPath,
          items: items.map((i) => ({
            size: i.size,
            shape: i.shape,
            flavour: i.flavour,
            frosting: i.frosting,
            toppings: i.toppings,
            message: i.message,
            notes: i.notes,
            qty: i.qty,
            image: i.image,
          })),
        },
      });

      sessionStorage.setItem(
        "hbi-last-order",
        JSON.stringify({
          ...result,
          customerName: form.customerName,
          phone: form.phone,
          address: form.address,
          deliveryDate: form.deliveryDate,
          deliverySlot: TIME_SLOTS.find((s) => s.id === form.deliverySlot)?.label,
          descriptions: items.map((i) => ({ text: describe(i), qty: i.qty, message: i.message })),
        }),
      );
      clear();
      void navigate({ to: "/order-confirmed" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageTransition>
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-6xl">
          <PageHeader eyebrow="Checkout" title="Where should we deliver?" />

          <form onSubmit={onSubmit} className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              <Panel>
                <FieldLabel>Delivery details</FieldLabel>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    className={inputClass}
                    placeholder="Full name *"
                    value={form.customerName}
                    onChange={(e) => set("customerName", e.target.value)}
                  />
                  <input
                    required
                    type="tel"
                    className={inputClass}
                    placeholder="Phone number * (WhatsApp)"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="Email (optional)"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  <select
                    required
                    className={inputClass}
                    value={form.area}
                    onChange={(e) => set("area", e.target.value)}
                  >
                    <option value="">Area / Sector *</option>
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
                  <textarea
                    required
                    className={`${inputClass} min-h-24 sm:col-span-2`}
                    placeholder="Complete delivery address (house / street / landmark) *"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                  />
                </div>
              </Panel>

              <Panel>
                <FieldLabel hint={`Minimum ${MIN_NOTICE_HOURS} hrs notice`}>When do you need it?</FieldLabel>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    type="date"
                    min={minDeliveryDate()}
                    className={inputClass}
                    value={form.deliveryDate}
                    onChange={(e) => set("deliveryDate", e.target.value)}
                  />
                  <select
                    className={inputClass}
                    value={form.deliverySlot}
                    onChange={(e) => set("deliverySlot", e.target.value)}
                  >
                    {TIME_SLOTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <textarea
                    className={`${inputClass} min-h-20`}
                    placeholder="Anything else we should know about the delivery? (optional)"
                    value={form.orderNotes}
                    onChange={(e) => set("orderNotes", e.target.value)}
                  />
                </div>
              </Panel>

              <Panel>
                <FieldLabel>Payment method</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-3">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`rounded-2xl border px-4 py-4 text-left transition-all hover:-translate-y-0.5 ${
                        paymentMethod === m.id
                          ? "border-[var(--gold)] bg-[var(--cream-deep)] gold-rim"
                          : "border-[var(--chocolate)]/12 bg-card hover:border-[var(--gold)]/50"
                      }`}
                    >
                      <span className="block text-sm font-medium text-[var(--chocolate)]">{m.label}</span>
                      <span className="mt-1 block text-[11px] text-[var(--chocolate-soft)]">{m.hint}</span>
                    </button>
                  ))}
                </div>

                {method.details && (
                  <div className="mt-5 rounded-2xl border border-[var(--gold)]/30 bg-[var(--cream-deep)] p-5">
                    <ul className="space-y-1 text-sm text-[var(--chocolate)]">
                      {method.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[11px] text-[var(--chocolate-soft)]">{ADVANCE_NOTE}</p>

                    <label className="mt-4 block text-xs uppercase tracking-[0.18em] text-[var(--chocolate-soft)]">
                      Payment screenshot *
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProof(e.target.files?.[0] ?? null)}
                        className="mt-2 block w-full text-sm text-[var(--chocolate-soft)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--chocolate)] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-widest file:text-[var(--cream)]"
                      />
                    </label>
                  </div>
                )}
              </Panel>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <Panel>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]">Your order</p>
                <ul className="mt-4 space-y-3">
                  {items.map((i) => (
                    <li key={i.id} className="flex justify-between gap-4 text-sm">
                      <span className="text-[var(--chocolate-soft)]">
                        {i.qty} × Custom Cake
                        <span className="block text-[11px] opacity-80">{describe(i)}</span>
                      </span>
                      <span className="tabular-nums">{formatPKR(i.unitPrice * i.qty)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-2 border-t border-[var(--chocolate)]/10 pt-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--chocolate-soft)]">Subtotal</span>
                    <span className="tabular-nums">{formatPKR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--chocolate-soft)]">Delivery{area ? ` · ${area.label}` : ""}</span>
                    <span className="tabular-nums">{area ? formatPKR(fee) : "—"}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-[var(--chocolate)]/10 pt-5">
                  <span className="text-sm uppercase tracking-[0.2em] text-[var(--chocolate-soft)]">Total</span>
                  <span className="font-display text-4xl text-[var(--chocolate)]">{formatPKR(total)}</span>
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="mt-6 w-full rounded-full bg-[var(--chocolate)] px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--cream)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)] disabled:opacity-60"
                >
                  {busy ? "Placing order…" : `Place Order — ${formatPKR(total)}`}
                </button>
              </Panel>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
