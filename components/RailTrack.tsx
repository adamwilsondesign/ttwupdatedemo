"use client";
import { useEffect, useRef } from "react";

/* Wraps the sections below the hero. Draws the double rail in the gutter,
   the bend where it leaves the hero street, a lime "distance travelled"
   fill, a tram that rides the rails with scroll, and a buffer stop at the
   end of the line. Stations light up as the tram passes them. */
export function RailTrack({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const tram = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const probe = window.innerHeight * 0.55;
      const y = Math.max(0, Math.min(r.height - 60, probe - r.top));
      if (fill.current) fill.current.style.height = `${y}px`;
      if (tram.current) tram.current.style.transform = `translate3d(0, ${y}px, 0)`;
      el.querySelectorAll<HTMLElement>("[data-station]").forEach((s) => {
        const sr = s.getBoundingClientRect();
        s.classList.toggle("lit", sr.top < probe);
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={wrap} className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-full max-w-[1440px] -translate-x-1/2" aria-hidden>
        {/* bend: track leaves the hero street and turns down the page */}
        <div className="absolute left-[calc(var(--gutter)/2-6px)] right-0 top-[-1px] h-12">
          <svg className="absolute left-0 top-0 h-12 w-12 overflow-visible" viewBox="0 0 48 48" fill="none">
            <path d="M0.75 48 V44 A43.25 43.25 0 0 1 44 0.75 H48" stroke="var(--fg)" strokeWidth="1.5" />
            <path d="M11.25 48 V44 A32.75 32.75 0 0 1 44 11.25 H48" stroke="var(--fg)" strokeWidth="1.5" />
          </svg>
          <div className="absolute left-12 right-0 top-0 h-3 border-y-[1.5px] border-[var(--fg)] bg-[repeating-linear-gradient(to_right,transparent_0_10px,var(--line)_10px_12.5px)]" />
        </div>
        <div className="rails top-12">
          <div ref={fill} className="rails-fill" />
          <div ref={tram} className="absolute -left-[6.5px] top-0 will-change-transform">
            <Tram />
          </div>
        </div>
        {/* buffer stop */}
        <div className="absolute bottom-0 left-[calc(var(--gutter)/2-14px)] h-3 w-7 rounded-sm border-[1.5px] border-[var(--fg)] bg-signal" />
      </div>
      {children}
    </div>
  );
}

function Tram() {
  return (
    <svg width="25" height="64" viewBox="0 0 25 64" fill="none">
      <defs>
        <radialGradient id="tramLight" cx="0.5" cy="0" r="0.8">
          <stop offset="0" stopColor="#d4ff3a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#d4ff3a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="12.5" cy="64" rx="16" ry="18" fill="url(#tramLight)" />
      <rect x="1" y="1" width="23" height="60" rx="9" fill="#2e46ff" stroke="#eef1ff" strokeWidth="1.5" />
      <rect x="5" y="7" width="15" height="10" rx="3" fill="#05060f" />
      <rect x="5" y="22" width="15" height="7" rx="1.5" fill="#1422b0" />
      <rect x="5" y="32" width="15" height="7" rx="1.5" fill="#1422b0" />
      <rect x="5" y="45" width="15" height="10" rx="3" fill="#05060f" />
      <circle cx="7" cy="59" r="1.6" fill="#d4ff3a" />
      <circle cx="18" cy="59" r="1.6" fill="#d4ff3a" />
    </svg>
  );
}
