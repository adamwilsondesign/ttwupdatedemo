"use client";
import { useEffect, useRef, useState } from "react";

/* Counts up when scrolled into view. The final value is rendered invisibly in
   the same grid cell, so the box is sized for the full number from the start
   and never grows while counting. */
export function CountUp({ value, prefix = "", suffix = "", duration = 1800 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value); // SSR renders the final number
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);
  const fmt = (v: number) => (
    <>{prefix}{v.toLocaleString("en-CA")}{suffix && <span className="text-signal">{suffix}</span>}</>
  );
  return (
    <span ref={ref} className="inline-grid tabular-nums">
      <span className="invisible col-start-1 row-start-1" aria-hidden>{fmt(value)}</span>
      <span className="col-start-1 row-start-1 text-left">{fmt(n)}</span>
    </span>
  );
}
