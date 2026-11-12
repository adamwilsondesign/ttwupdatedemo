"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/site.config";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const p = now ? parts(new Date(site.startISO).getTime() - now) : null;
  const cells: [string, number | undefined][] = [["Days", p?.d], ["Hrs", p?.h], ["Min", p?.m], ["Sec", p?.s]];
  return (
    <div className="flex w-full flex-col items-center gap-3 lg:items-start">
      <p className="eyebrow text-[var(--muted)]">Countdown to TTW 2027</p>
      <div className="flex items-end gap-4">
        {cells.map(([l, v], i) => (
          <div key={l} className="flex items-end gap-4">
            <div className="text-center">
              <div className="font-mono text-[1.9rem] leading-none tabular-nums tracking-tight">{v === undefined ? "––" : String(v).padStart(i === 0 ? 3 : 2, "0")}</div>
              <div className="eyebrow mt-1 text-[0.6rem] text-[var(--muted)]">{l}</div>
            </div>
            {i < 3 && <span className="pb-5 text-volt-400">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
