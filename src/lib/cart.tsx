import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { priceBreakdown, type CakeConfig } from "./cart-pricing";

export * from "./cart-pricing";

export type CartItem = CakeConfig & {
  id: string;
  qty: number;
  unitPrice: number;
};

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
