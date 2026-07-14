import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onNav: (next: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length, onClose, onNav]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] grid place-items-center bg-[var(--chocolate)]/90 p-4 backdrop-blur"
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-[var(--cream)]/25 text-[var(--cream)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>

          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); onNav((index - 1 + images.length) % images.length); }}
            className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-[var(--cream)]/25 text-[var(--cream)] transition hover:border-[var(--gold)] hover:text-[var(--gold)] md:left-8"
          >‹</button>
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); onNav((index + 1) % images.length); }}
            className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-[var(--cream)]/25 text-[var(--cream)] transition hover:border-[var(--gold)] hover:text-[var(--gold)] md:right-8"
          >›</button>

          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Cake"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[86vh] max-w-[92vw] rounded-2xl object-contain shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-1.5 text-xs uppercase tracking-widest text-[var(--cream)]/80">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}