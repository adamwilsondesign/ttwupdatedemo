"use client";
import { useMemo, useState } from "react";
import type { HostRecord } from "@/data/hosts";
import type { LogoMap } from "@/lib/logos";
import { Logo } from "@/components/Logo";

/* Every committed host as a logo tile, alphabetical. Tiles sit on a 1.5px
   gap grid so the rules stay perfectly even at every breakpoint. */
export function HostGrid({ hosts, logos }: { hosts: HostRecord[]; logos: LogoMap }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? hosts.filter((h) => h.name.toLowerCase().includes(t)) : hosts;
  }, [hosts, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-t-[1.5px] rule-strong px-[var(--pad)] py-5 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex h-12 w-full items-center gap-3 rounded-full border-[1.5px] rule-strong bg-[var(--surface)] px-5 focus-within:border-volt sm:w-[360px]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.75" /><path d="m11 11 4 4" stroke="currentColor" strokeWidth="1.75" /></svg>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a host" className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--muted)]" />
        </label>
        <span className="eyebrow text-[var(--muted)]">{list.length} of {hosts.length} · A–Z</span>
      </div>
      <div className="grid grid-cols-2 gap-[1.5px] border-y-[1.5px] rule bg-[var(--line)] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {list.map((h) => (
          <div key={h.id} className="group grid h-32 place-items-center bg-[var(--bg)] px-6 transition-colors duration-300 hover:bg-volt hover:text-white md:h-40">
            <div className="w-full group-hover:[&_img]:![filter:brightness(0)_invert(1)]">
              <Logo org={h} src={logos[h.slug]} className="h-9 md:h-10" wordmarkClass="text-[1.05rem] md:text-[1.25rem] whitespace-normal leading-tight line-clamp-2" />
            </div>
          </div>
        ))}
        {/* pad the last row so the grid always closes cleanly */}
        {Array.from({ length: (5 - (list.length % 5)) % 5 }).map((_, i) => (
          <div key={`pad${i}`} className="hidden bg-[var(--bg)] xl:block" />
        ))}
      </div>
      {!list.length && <p className="p-16 text-center text-2xl">No hosts match &ldquo;{q}&rdquo;.</p>}
    </div>
  );
}
