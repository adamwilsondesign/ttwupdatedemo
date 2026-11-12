"use client";
import { useEffect, useRef, useState } from "react";

/* Shown once per session. A spinning wireframe globe inside a rotating ring
   of type, a count-up, and a track progress bar with a tram riding it.
   While html[data-preload] is set, hero intro animations wait. */
export function Preloader() {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-preload")) { setGone(true); return; }
    if (started.current) return;
    started.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 300 : 2200;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) { raf = requestAnimationFrame(tick); return; }
      setTimeout(() => {
        setOut(true);
        setTimeout(() => {
          root.removeAttribute("data-preload");
          try { sessionStorage.setItem("ttw-pl", "1"); } catch {}
        }, 380);
        setTimeout(() => setGone(true), 1000);
      }, 220);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;
  const ring = "TORONTO TECH WEEK · MAY 31 – JUNE 4 · BUILT BY TORONTO, FOR THE WORLD · ";

  return (
    <div className={`preloader fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#05060f] text-[#f3f4f9] ${out ? "out" : ""}`} aria-hidden>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_45%,rgba(46,70,255,0.45),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(60%_60%_at_50%_45%,#000,transparent)]" />

      <div className="relative h-[260px] w-[260px] md:h-[320px] md:w-[320px]">
        <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" style={{ animation: "spin 14s linear infinite" }}>
          <defs><path id="ringPath" d="M160,160 m-138,0 a138,138 0 1,1 276,0 a138,138 0 1,1 -276,0" /></defs>
          <text fontFamily="decimaMono, monospace" fontSize="12.5" fill="#b7c3ff">
            <textPath href="#ringPath" textLength="862" lengthAdjust="spacing">{ring}</textPath>
          </text>
        </svg>
        <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="globeFill" cx="0.35" cy="0.3" r="0.8">
              <stop offset="0" stopColor="#5c70ff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#070c45" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          <circle cx="160" cy="160" r="96" fill="url(#globeFill)" stroke="#eef1ff" strokeWidth="1.75" />
          {[-60, -30, 0, 30, 60].map((lat) => {
            const y = 160 + 96 * Math.sin((lat * Math.PI) / 180);
            const rx = 96 * Math.cos((lat * Math.PI) / 180);
            return <ellipse key={lat} cx="160" cy={y} rx={rx} ry={rx * 0.16} fill="none" stroke="#8a9bff" strokeWidth="1" opacity={0.7} />;
          })}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse key={i} className="meridian" cx="160" cy="160" rx="96" ry="96" fill="none" stroke={i === 0 ? "#d4ff3a" : "#b7c3ff"} strokeWidth={i === 0 ? 1.75 : 1}
              style={{ animationDelay: `${-i * 0.53}s` }} />
          ))}
          {/* Toronto pin */}
          <circle cx="178" cy="128" r="4" fill="#d4ff3a" />
          <circle cx="178" cy="128" r="4" fill="none" stroke="#d4ff3a" style={{ animation: "pulse-ring 1.6s ease-out infinite", transformOrigin: "178px 128px" }} />
        </svg>
      </div>

      <p className="eyebrow relative mt-8 text-[#b7c3ff]">Toronto Tech Week returns in</p>
      <p className="display relative mt-3 text-[clamp(4.5rem,12vw,9rem)] text-volt-grad">2027</p>

      <div className="relative mt-10 w-[min(420px,80vw)]">
        <div className="relative h-3 border-y-[1.5px] border-[#f3f4f9] bg-[repeating-linear-gradient(to_right,transparent_0_10px,#3d4475_10px_12.5px)]">
          <div className="absolute inset-y-[-1.5px] left-0 border-y-[1.5px] border-signal shadow-[0_0_16px_rgba(212,255,58,0.5)]" style={{ width: `${pct}%` }} />
          <div className="absolute top-1/2 h-[14px] w-[38px] -translate-y-1/2 rounded-[6px] border-[1.5px] border-[#eef1ff] bg-volt" style={{ left: `calc(${pct}% - ${pct * 0.38}px)` }}>
            <span className="absolute right-[3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_8px_2px_#d4ff3a]" />
          </div>
        </div>
        <div className="eyebrow mt-4 flex justify-between text-[0.65rem] text-[#9aa0c3]">
          <span>Union Stn</span>
          <span className="tabular-nums text-signal">{String(pct).padStart(3, "0")}%</span>
          <span>May 31</span>
        </div>
      </div>
    </div>
  );
}
