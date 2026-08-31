import { FLAVOURS, FROSTINGS, SHAPES, SIZES, TOPPINGS, byId } from "./order-config";

export type CakeConfig = {
  size: string;
  shape: string;
  flavour: string;
  frosting: string;
  toppings: string[];
  message: string;
  notes: string;
  image?: string;
  categoryName?: string;
};

export type PriceLine = { label: string; amount: number };

export function priceBreakdown(cfg: CakeConfig): { lines: PriceLine[]; total: number } {
  const size = byId(SIZES, cfg.size);
  const shape = byId(SHAPES, cfg.shape);
  const flavour = byId(FLAVOURS, cfg.flavour);
  const frosting = byId(FROSTINGS, cfg.frosting);

  const lines: PriceLine[] = [
    { label: `${size.label} base`, amount: size.price },
    { label: `${shape.label} shape`, amount: shape.price },
    { label: flavour.label, amount: flavour.price },
    { label: `${frosting.label} finish`, amount: frosting.price },
  ];
  for (const t of cfg.toppings) {
    const top = TOPPINGS.find((o) => o.id === t);
    if (top) lines.push({ label: top.label, amount: top.price });
  }
  return { lines, total: lines.reduce((s, l) => s + l.amount, 0) };
}

export function describe(cfg: CakeConfig) {
  const parts = [
    byId(SIZES, cfg.size).label,
    byId(SHAPES, cfg.shape).label,
    byId(FLAVOURS, cfg.flavour).label,
    byId(FROSTINGS, cfg.frosting).label,
  ];
  const tops = cfg.toppings.map((t) => TOPPINGS.find((o) => o.id === t)?.label).filter(Boolean);
  if (tops.length) parts.push(tops.join(", "));
  return parts.join(" · ");
}

export const DEFAULT_CONFIG: CakeConfig = {
  size: "1kg",
  shape: "round",
  flavour: "chocolate",
  frosting: "buttercream",
  toppings: [],
  message: "",
  notes: "",
};
