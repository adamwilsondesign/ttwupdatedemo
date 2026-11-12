"use client";

import { useEffect, useRef, useState } from "react";
import { Defs, FarLayer, MidLayer, NearLayer, Ties, VB_W, VB_H, GROUND, RAIL_Y } from "./SkylineLayers";
import { Streetcar, CAR_W, CAR_H } from "./Streetcar";
import { site } from "@/lib/site.config";
import { presenting } from "@/data/sponsors";
import { Logo } from "@/components/Logo";
import type { LogoMap } from "@/lib/logos";
import { Countdown } from "./Countdown";

const WIRE_Y = RAIL_Y - CAR_H + 2 - 43;
const MAX_WORLD = 640;
const KNOB_TRAVEL = 52;

export function Hero({ logos }: { logos: LogoMap }) {
  const far = useRef<SVGGElement>(null);
  const mid = useRef<SVGGElement>(null);
  const near = useRef<SVGGElement>(null);
  const ties = useRef<SVGGElement>(null);
  const car = useRef<SVGGElement>(null);
  const beam = useRef<SVGGElement>(null);
  const wheels = useRef<(SVGGElement | null)[]>([]);
  const knob = useRef<HTMLDivElement>(null);
  const trackEl = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState(false);

  // mutable sim state — never triggers React renders
  const sim = useRef({ world: 0, v: 0, j: 0, input: 0, dragging: false, keys: 0, lastInput: -10, carX: 0, mouse: 0, t: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const s = sim.current;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      s.t += dt;
      const userDriving = s.dragging || s.keys !== 0;
      const idleFor = s.t - s.lastInput;

      // joystick target: user input, else a gentle autopilot that shows the
      // streetcar + joystick moving together (invites interaction)
      let target = 0;
      if (userDriving) target = s.input;
      else if (!reduce && idleFor > 2.2) target = Math.sin((s.t - s.lastInput) * 0.75) * 0.55;
      s.j += (target - s.j) * Math.min(1, dt * (userDriving ? 18 : 4));

      // physics
      const accel = s.j * 950;
      s.v += accel * dt;
      s.v *= 1 - Math.min(1, 1.6 * dt);
      if (!userDriving) s.v += -s.world * 0.9 * dt; // drift home so the CN Tower stays framed
      s.world += s.v * dt;
      if (s.world > MAX_WORLD) { s.world = MAX_WORLD; s.v = Math.min(0, s.v); }
      if (s.world < -MAX_WORLD) { s.world = -MAX_WORLD; s.v = Math.max(0, s.v); }

      // car leans ahead of centre with speed, but always returns to centre
      const targetCarX = Math.max(-120, Math.min(120, s.v * 0.32));
      s.carX += (targetCarX - s.carX) * Math.min(1, dt * 3);
      const tilt = Math.max(-1.6, Math.min(1.6, -accel * 0.0016));

      const m = s.mouse;
      far.current?.setAttribute("transform", `translate(${-s.world * 0.18 + m * 6} 0)`);
      mid.current?.setAttribute("transform", `translate(${-s.world * 0.45 + m * 12} 0)`);
      near.current?.setAttribute("transform", `translate(${-s.world + m * 20} 0)`);
      ties.current?.setAttribute("transform", `translate(${-(((s.world % 18) + 18) % 18) + m * 20} 0)`);
      const cx = VB_W / 2 - CAR_W / 2 + s.carX + m * 20;
      const cy = RAIL_Y - CAR_H + 2;
      car.current?.setAttribute("transform", `translate(${cx} ${cy}) rotate(${tilt} ${CAR_W / 2} ${CAR_H})`);
      const rot = (s.world / 8) * (180 / Math.PI);
      wheels.current.forEach((w) => w?.setAttribute("transform", `rotate(${rot})`));
      if (beam.current) {
        beam.current.style.transform = s.v < -4 ? "scaleX(-1)" : "scaleX(1)";
        beam.current.style.opacity = String(Math.min(1, 0.35 + Math.abs(s.v) / 160));
      }
      if (knob.current) knob.current.style.transform = `translateX(${s.j * KNOB_TRAVEL}px) rotate(${s.j * 12}deg)`;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement !== trackEl.current) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const dir = e.key === "ArrowLeft" ? -1 : 1;
        if (e.type === "keydown") { s.keys = dir; s.input = dir; s.lastInput = s.t; setTouched(true); }
        else if (s.keys === dir) { s.keys = 0; s.input = 0; s.lastInput = s.t; }
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("keydown", onKey); window.removeEventListener("keyup", onKey); };
  }, []);

  const setFromPointer = (clientX: number) => {
    const el = trackEl.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = clientX - (r.left + r.width / 2);
    sim.current.input = Math.max(-1, Math.min(1, dx / KNOB_TRAVEL));
    sim.current.lastInput = sim.current.t;
  };

  return (
    <section data-tone="dark" id="top" className="relative overflow-hidden" onPointerMove={(e) => {
      const w = window.innerWidth;
      sim.current.mouse = (e.clientX / w - 0.5) * -1;
    }}>
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 grad-horizon" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />

      <div className="frame mx-auto max-w-[1440px] pt-28 md:pt-[124px]">
        <span className="cross -left-[9px] top-[88px]" />
        <span className="cross -right-[9px] top-[88px]" />

        {/* headline */}
        <div className="relative z-10 px-4 text-center md:px-8">
          <h1>
            <span className="block text-[clamp(1.35rem,2.4vw,2.25rem)] font-normal tracking-[-0.02em] text-[var(--muted)]" style={{ animation: "rise 1s var(--ease-out-expo) both" }}>
              Host an event at
            </span>
            <span className="display mt-2 block text-[clamp(3.1rem,7.7vw,8.4rem)] lg:whitespace-nowrap" style={{ animation: "rise 1.1s 80ms var(--ease-out-expo) both" }}>
              Toronto Tech Week <span className="text-volt-grad">2027</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-full text-[clamp(1rem,1.35vw,1.25rem)] text-[var(--muted)] md:whitespace-nowrap" style={{ animation: "rise 1.1s 160ms var(--ease-out-expo) both" }}>
            <span className="font-medium text-[var(--fg)]">{site.dates}</span>
            <span className="mx-3 text-volt-400">/</span>
            Join the community that brought 603 events to the city in 2026.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animation: "rise 1.1s 240ms var(--ease-out-expo) both" }}>
            <a className="btn btn-volt" href={site.links.applyToHost}>Apply to Host <Arrow /></a>
            <a className="btn btn-ghost" href="#subscribe">Subscribe for Updates</a>
          </div>
          <div className="eyebrow mt-5 flex items-center justify-center gap-6 text-[var(--muted)]">
            <a className="link-u hover:text-[var(--fg)]" href={site.links.hostingResources}>Hosting resources ↗</a>
            <a className="link-u hover:text-[var(--fg)]" href={site.links.hostQA}>Host Q&amp;A ↗</a>
          </div>
        </div>

        {/* skyline */}
        <div className="relative mt-4 h-[max(320px,29vw)] max-h-[560px] w-full select-none md:mt-2" aria-hidden>
          <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMax slice">
            <Defs />
            <rect x={-700} y={0} width={3000} height={VB_H} fill="url(#skyGlow)" />
            <g ref={far}><FarLayer /></g>
            <g ref={mid}><MidLayer /></g>
            <g ref={near}><NearLayer /></g>
            {/* street */}
            <rect x={-700} y={GROUND} width={3000} height={VB_H - GROUND} fill="#05060f" />
            <line x1={-700} y1={GROUND + 1} x2={2300} y2={GROUND + 1} stroke="#dce2ff" strokeWidth="2" />
            <line x1={-700} y1={GROUND + 14} x2={2300} y2={GROUND + 14} stroke="#3d4475" strokeWidth="1.5" strokeDasharray="10 8" />
            <g ref={ties}><Ties /></g>
            <line x1={-700} y1={RAIL_Y} x2={2300} y2={RAIL_Y} stroke="#8a9bff" strokeWidth="2.5" />
            <line x1={-700} y1={RAIL_Y + 8} x2={2300} y2={RAIL_Y + 8} stroke="#5c70ff" strokeWidth="2" />
            {/* overhead wire */}
            <path d={`M-700,${WIRE_Y - 10} ${Array.from({ length: 13 }).map((_, k) => `Q${-580 + k * 240},${WIRE_Y - 2} ${-460 + k * 240},${WIRE_Y - 10}`).join(" ")}`} fill="none" stroke="#5c70ff" strokeWidth="1" />
            <line x1={-700} y1={WIRE_Y} x2={2300} y2={WIRE_Y} stroke="#b7c3ff" strokeWidth="1.25" />
            <Streetcar ref={car} wheelRef={wheels} beamRef={beam} />
          </svg>
        </div>

        {/* control strip */}
        <div className="relative grid grid-cols-1 border-t-[1.5px] rule-strong lg:grid-cols-[1fr_auto_1fr]">
          <span className="cross -left-[9px] -top-[9px]" />
          <span className="cross -right-[9px] -top-[9px]" />
          <div className="order-3 flex items-center justify-center gap-5 border-t-[1.5px] rule px-6 py-6 lg:order-1 lg:justify-start lg:border-t-0 lg:border-r-[1.5px] lg:px-8">
            <Countdown />
          </div>

          {/* joystick */}
          <div className="order-1 flex flex-col items-center gap-3 px-8 py-6 lg:order-2">
            <div className="flex items-center gap-4">
              <button aria-label="Drive left" className="eyebrow grid h-9 w-9 place-items-center rounded-full border-[1.5px] rule-strong hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                onPointerDown={() => { sim.current.keys = -1; sim.current.input = -1; setTouched(true); }}
                onPointerUp={() => { sim.current.keys = 0; sim.current.input = 0; sim.current.lastInput = sim.current.t; }}
                onPointerLeave={() => { if (sim.current.keys === -1) { sim.current.keys = 0; sim.current.input = 0; } }}>◀</button>
              <div
                ref={trackEl}
                role="slider"
                tabIndex={0}
                aria-label="Drive the streetcar. Use left and right arrow keys."
                aria-valuemin={-1}
                aria-valuemax={1}
                aria-valuenow={0}
                className="relative h-[60px] w-[176px] cursor-grab touch-none rounded-full border-[1.5px] rule-strong bg-[var(--surface)] outline-none focus-visible:ring-2 focus-visible:ring-volt-400 active:cursor-grabbing"
                onPointerDown={(e) => {
                  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                  sim.current.dragging = true; setTouched(true); setFromPointer(e.clientX);
                }}
                onPointerMove={(e) => { if (sim.current.dragging) setFromPointer(e.clientX); }}
                onPointerUp={() => { sim.current.dragging = false; sim.current.input = 0; sim.current.lastInput = sim.current.t; }}
                onPointerCancel={() => { sim.current.dragging = false; sim.current.input = 0; }}
              >
                <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--line)]" />
                <div className="absolute left-1/2 top-1/2 -ml-[23px] -mt-[23px] h-[46px] w-[46px]">
                  <div ref={knob} className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_35%_30%,#b7c3ff,#2e46ff_55%,#1422b0)] shadow-[0_0_0_1.5px_#eef1ff_inset,0_0_30px_4px_rgba(46,70,255,0.7)]">
                    {!touched && <span className="absolute inset-0 rounded-full border-2 border-volt-300" style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />}
                  </div>
                </div>
              </div>
              <button aria-label="Drive right" className="eyebrow grid h-9 w-9 place-items-center rounded-full border-[1.5px] rule-strong hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                onPointerDown={() => { sim.current.keys = 1; sim.current.input = 1; setTouched(true); }}
                onPointerUp={() => { sim.current.keys = 0; sim.current.input = 0; sim.current.lastInput = sim.current.t; }}
                onPointerLeave={() => { if (sim.current.keys === 1) { sim.current.keys = 0; sim.current.input = 0; } }}>▶</button>
            </div>
            <p className="eyebrow text-[var(--muted)]">{touched ? "Next stop: TTW 2027" : "Drag to drive the 504"}</p>
          </div>

          <div className="order-2 border-t-[1.5px] rule px-6 py-6 lg:order-3 lg:border-l-[1.5px] lg:border-t-0 lg:px-8">
            <p className="eyebrow mb-4 text-center text-[var(--muted)] lg:text-left">2027 Presenting Sponsors</p>
            <div className="grid grid-cols-4 items-center gap-4">
              {presenting.map((o) => (
                <Logo key={o.slug} org={o} src={logos[o.slug]} className="h-7" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}
