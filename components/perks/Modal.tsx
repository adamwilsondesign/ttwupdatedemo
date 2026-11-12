"use client";
import { useEffect } from "react";

export function Modal({ open, onClose, children, label }: { open: boolean; onClose: () => void; children: React.ReactNode; label: string }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={label}>
      <button aria-label="Close" className="absolute inset-0 bg-[#04050d]/70 backdrop-blur-md" style={{ animation: "rise 300ms ease both" }} onClick={onClose} />
      <div className="relative max-h-[92svh] w-full max-w-[560px] overflow-y-auto rounded-t-3xl border-[1.5px] rule-strong bg-[var(--bg)] text-[var(--fg)] shadow-[0_40px_120px_-20px_rgba(46,70,255,0.6)] sm:rounded-3xl"
        style={{ animation: "rise 500ms var(--ease-out-expo) both" }}>
        <button onClick={onClose} className="eyebrow absolute right-4 top-4 z-10 rounded-full border-[1.5px] rule bg-[var(--bg)] px-3 py-1.5 text-[var(--fg)] hover:border-volt">Close ✕</button>
        {children}
      </div>
    </div>
  );
}
