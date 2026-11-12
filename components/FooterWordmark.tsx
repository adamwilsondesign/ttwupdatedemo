"use client";
import { useEffect, useRef } from "react";

const WORD = "Toronto Tech Week";

/* Giant wordmark fitted edge-to-edge to the viewport and sunk below the page's
   bottom edge. Letters rise out of the edge toward the cursor (a magnetic wave);
   on touch / idle the wave drifts across on its own. */
export function FooterWordmark() {
  const wrap = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const letters = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const w = wrap.current, t = text.current;
    if (!w || !t) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let size = 100;

    const fit = () => {
      t.style.fontSize = "100px";
      const natural = t.scrollWidth;
      size = Math.floor((100 * w.clientWidth * 0.985) / natural);
      t.style.fontSize = `${size}px`;
      w.style.height = `${size * 0.6}px`; // show the top ~60% — the rest bleeds off the page
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(w);
    document.fonts?.ready.then(fit);

    const n = letters.current.length;
    const lift = new Array(n).fill(0);
    let pointerX: number | null = null;
    let last = performance.now();
    let idle = 0;
    let raf = 0;
    let visible = false;

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }, { rootMargin: "100px" });
    io.observe(w);

    function frame(now: number) {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      idle += dt;
      const rect = w!.getBoundingClientRect();
      let cx: number | null = pointerX;
      if (cx === null && !reduce) cx = rect.left + ((Math.sin(now / 1800) + 1) / 2) * rect.width; // autoplay wave
      letters.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mid = r.left + r.width / 2;
        const target = cx === null ? 0 : Math.exp(-Math.pow((mid - cx) / (size * 0.75), 2));
        lift[i] += (target - lift[i]) * Math.min(1, dt * 9);
        const y = (1 - lift[i]) * size * 0.2;
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
        el.style.setProperty("--lit", lift[i].toFixed(3));
      });
      raf = requestAnimationFrame(frame);
    }

    const move = (e: PointerEvent) => { if (e.pointerType === "mouse") { pointerX = e.clientX; idle = 0; } };
    const leave = () => { pointerX = null; };
    w.addEventListener("pointermove", move);
    w.addEventListener("pointerleave", leave);
    return () => { ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf); w.removeEventListener("pointermove", move); w.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <div ref={wrap} className="relative left-1/2 w-screen -translate-x-1/2 cursor-default select-none overflow-hidden" aria-label={WORD} role="img">
      <div ref={text} className="display absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap leading-[0.8]" aria-hidden>
        {WORD.split("").map((ch, i) => (
          <span key={i} ref={(el) => { if (el) letters.current[i] = el; }}
            className="footer-letter inline-block will-change-transform">
            {ch === " " ? " " : ch}
          </span>
        ))}
      </div>
    </div>
  );
}
