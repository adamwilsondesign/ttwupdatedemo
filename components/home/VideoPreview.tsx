"use client";
import { useState } from "react";
import { site } from "@/lib/site.config";

/* Full-width Homecoming recap preview. Plays inline once a YouTube ID is set
   in site.config; until then it opens the TTW YouTube channel. */
export function VideoPreview() {
  const [playing, setPlaying] = useState(false);
  const id = site.links.homecomingVideoId;
  return (
    <div className="reveal mt-10 px-[var(--pad)] md:mt-14">
      <div className="relative aspect-video overflow-hidden rounded-2xl border-[1.5px] rule-strong lg:aspect-[21/9]">
        {playing && id ? (
          <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title="Homecoming 2026 recap" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button
            onClick={() => (id ? setPlaying(true) : window.open(site.links.homecoming, "_blank", "noopener"))}
            className="group absolute inset-0 block text-left text-white"
            aria-label="Play the Homecoming 2026 recap"
          >
            <div className="absolute inset-0 bg-[#05060f]" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_50%_0%,rgba(46,70,255,0.85),transparent_70%)]" />
            <svg viewBox="0 0 1200 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
              <path d="M600 0 330 500h540Z" fill="#5c70ff" opacity="0.25" />
              <rect x="300" y="120" width="600" height="190" fill="none" stroke="#b7c3ff" strokeWidth="2" />
              {Array.from({ length: 60 }).map((_, i) => (
                <g key={i} fill="#05060f" stroke="#3d4475" strokeWidth="1">
                  <circle cx={(i * 53) % 1240 - 20} cy={400 + (i % 4) * 22} r={18} />
                  <rect x={(i * 53) % 1240 - 38} y={418 + (i % 4) * 22} width={36} height={90} rx={16} />
                </g>
              ))}
            </svg>
            <div className="grain absolute inset-0" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,15,0.85),transparent_55%)]" />
            <span className="absolute left-1/2 top-[42%] grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-signal text-[#04050d] shadow-[0_0_60px_10px_rgba(212,255,58,0.45)] transition-transform duration-500 group-hover:scale-110 md:h-28 md:w-28">
              <svg width="28" height="32" viewBox="0 0 28 32" aria-hidden><path d="M2 2v28l24-14z" fill="currentColor" /></svg>
            </span>
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-10">
              <div>
                <p className="eyebrow text-volt-100">Homecoming 2026 · History, Toronto</p>
                <p className="display mt-3 text-[clamp(2.2rem,5vw,4.6rem)]">Relive Homecoming</p>
              </div>
              <p className="eyebrow text-volt-100">1,100+ in the room · 282,000+ watching</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
