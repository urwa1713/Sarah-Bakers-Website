import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatPKR } from "@/lib/order-config";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl text-[var(--chocolate)] sm:text-5xl">{title}</h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-[var(--chocolate-soft)]">{subtitle}</p>
      )}
    </div>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[var(--gold)]/25 bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FieldLabel({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <span className="text-xs uppercase tracking-[0.22em] text-[var(--chocolate-soft)]">
        {children}
      </span>
      {hint && <span className="text-[11px] text-[var(--chocolate-soft)]/70">{hint}</span>}
    </div>
  );
}

export function OptionButton({
  active,
  onClick,
  label,
  price,
  type = "button",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  price?: number;
  type?: "button";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "group relative rounded-2xl border px-4 py-3 text-left transition-all duration-300",
        "hover:-translate-y-0.5",
        active
          ? "border-[var(--gold)] bg-[var(--cream-deep)] text-[var(--chocolate)] gold-rim"
          : "border-[var(--chocolate)]/12 bg-card text-[var(--chocolate-soft)] hover:border-[var(--gold)]/50",
      )}
    >
      <span className="block text-sm font-medium">{label}</span>
      {price !== undefined && price > 0 && (
        <span className="mt-0.5 block text-[11px] text-[var(--gold)]">+{formatPKR(price)}</span>
      )}
      {price === 0 && (
        <span className="mt-0.5 block text-[11px] text-[var(--chocolate-soft)]/60">Included</span>
      )}
    </button>
  );
}

export const inputClass =
  "w-full rounded-2xl border border-[var(--chocolate)]/12 bg-card px-4 py-3 text-sm text-[var(--chocolate)] outline-none transition-shadow placeholder:text-[var(--chocolate-soft)]/50 focus:border-[var(--gold)] focus:shadow-[0_0_0_3px_oklch(0.735_0.106_78/0.18)]";
