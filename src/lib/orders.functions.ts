import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ALL_AREAS, MIN_NOTICE_HOURS, PAYMENT_METHODS } from "./order-config";
import { priceBreakdown, describe, type CakeConfig } from "./cart-pricing";

const itemSchema = z.object({
  size: z.string(),
  shape: z.string(),
  flavour: z.string(),
  frosting: z.string(),
  toppings: z.array(z.string()).max(10),
  message: z.string().max(120).default(""),
  notes: z.string().max(1000).default(""),
  qty: z.number().int().min(1).max(20),
  image: z.string().optional(),
});

const orderSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(25),
  email: z.string().trim().email().max(150).optional().or(z.literal("")),
  address: z.string().trim().min(5).max(400),
  area: z.string(),
  deliveryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  deliverySlot: z.string(),
  paymentMethod: z.string(),
  paymentProofPath: z.string().max(400).optional().or(z.literal("")),
  orderNotes: z.string().max(1000).optional().or(z.literal("")),
  items: z.array(itemSchema).min(1).max(20),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const area = ALL_AREAS.find((a) => a.id === data.area);
    if (!area) throw new Error("Please choose a valid delivery area.");

    const method = PAYMENT_METHODS.find((m) => m.id === data.paymentMethod);
    if (!method) throw new Error("Please choose a payment method.");

    const earliest = new Date(Date.now() + MIN_NOTICE_HOURS * 3600 * 1000);
    earliest.setHours(0, 0, 0, 0);
    if (new Date(`${data.deliveryDate}T00:00:00`) < earliest) {
      throw new Error(`We need at least ${MIN_NOTICE_HOURS} hours to bake your cake.`);
    }

    // Recompute every price on the server — never trust client totals.
    const items = data.items.map((i) => {
      const cfg = i as unknown as CakeConfig;
      const { lines, total } = priceBreakdown(cfg);
      return {
        ...i,
        summary: describe(cfg),
        breakdown: lines,
        unitPrice: total,
        lineTotal: total * i.qty,
      };
    });

    const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
    const deliveryFee = area.fee;
    const total = subtotal + deliveryFee;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: data.customerName,
        phone: data.phone,
        email: data.email || null,
        address: data.address,
        area: `${area.city} — ${area.label}`,
        delivery_date: data.deliveryDate,
        delivery_slot: data.deliverySlot,
        items,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        payment_method: method.label,
        payment_proof_path: data.paymentProofPath || null,
        order_notes: data.orderNotes || null,
      })
      .select("id, order_number, created_at")
      .single();

    if (error) {
      console.error("placeOrder failed", error);
      throw new Error("We couldn't save your order. Please try again.");
    }

    return {
      id: row.id as string,
      orderNumber: row.order_number as string,
      subtotal,
      deliveryFee,
      total,
      areaLabel: `${area.city} — ${area.label}`,
      paymentLabel: method.label,
      items,
    };
  });
