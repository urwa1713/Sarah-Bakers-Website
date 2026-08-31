import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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

export type CartItem = CakeConfig & {
  id: string;
  qty: number;
  unitPrice: number;
};

export type PriceLine = { label: string; amount: number };

export function priceBreakdown(cfg: CakeConfig): { lines: PriceLine[]; total: number } {
  const size = byId(SIZES, cfg.size);
  const shape = byId(SHAPES, cfg.shape);
  const flavour = byId(FLAVOURS, cfg.flavour);
  const frosting = byId(FROSTINGS, cfg.frosting);

  const lines: PriceLine[] = [
    { label: `${size.label} base`, amount: size.price },
  ];
  if (shape.price) lines.push({ label: `${shape.label} shape`, amount: shape.price });
  else lines.push({ label: `${shape.label} shape`, amount: 0 });
  lines.push({ label: `${flavour.label}`, amount: flavour.price });
  lines.push({ label: `${frosting.label} finish`, amount: frosting.price });
  for (const t of cfg.toppings) {
    const top = TOPPINGS.find((o) => o.id === t);
    if (top) lines.push({ label: top.label, amount: top.price });
  }
  const total = lines.reduce((s, l) => s + l.amount, 0);
  return { lines, total };
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

type CartCtx = {
  items: CartItem[];
  add: (cfg: CakeConfig) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "hbi-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const value = useMemo<CartCtx>(() => {
    const subtotal = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
    return {
      items,
      subtotal,
      count: items.reduce((s, i) => s + i.qty, 0),
      add: (cfg) =>
        setItems((prev) => [
          ...prev,
          {
            ...cfg,
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            qty: 1,
            unitPrice: priceBreakdown(cfg).total,
          },
        ]),
      remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      setQty: (id, qty) =>
        setItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(20, qty)) } : i)),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
