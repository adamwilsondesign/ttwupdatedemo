"use client";
import { useMemo, useState } from "react";
import type { HostRecord } from "@/data/hosts";
import type { LogoMap } from "@/lib/logos";

export function HostDirectory({ hosts, logos }: { hosts: HostRecord[]; logos: LogoMap }) {
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    const g = new Map<string, HostRecord[]>();
    for (const h of hosts) {
      if (t && !h.name.toLowerCase().includes(t)) continue;
      const k = /[a-z]/i.test(h.name[0]) ? h.name[0].toUpperCase() : "#";
      g.set(k, [...(g.get(k) ?? []), h]);
    }
    return [...g.entries()];
  }, [hosts, q]);
  const letters = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const present = new Set(groups.map(([k]) => k));

  return (
    <div>
      <div className="z-30 lg:sticky lg:top-[88px] border-y-[1.5px] rule-strong bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 px-5 py-4 md:px-10 lg:flex-row lg:items-center">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${hosts.length} committed hosts…`}
            className="h-12 rounded-full border-[1.5px] rule-strong bg-[var(--surface)] px-5 outline-none placeholder:text-[var(--muted)] focus:border-volt lg:w-[340px]" />
          <nav className="flex flex-wrap gap-1" aria-label="Jump to letter">
            {letters.map((l) => (
              <a key={l} href={present.has(l) ? `#letter-${l}` : undefined}
                className={`grid h-8 w-8 place-items-center rounded-full font-mono text-xs ${present.has(l) ? "hover:bg-[var(--fg)] hover:text-[var(--bg)]" : "opacity-25"}`}>{l}</a>
            ))}
          </nav>
        </div>
      </div>
      {groups.map(([k, list]) => (
        <div key={k} id={`letter-${k}`} className="grid scroll-mt-48 border-b-[1.5px] rule lg:grid-cols-[160px_1fr]">
          <div className="display px-5 py-6 text-6xl text-[var(--accent)] md:px-10 lg:border-r-[1.5px] lg:rule">{k}</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((h) => (
              <li key={h.id} className="flex h-16 items-center justify-between gap-3 border-t-[1.5px] rule px-5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0 xl:[&:nth-child(3)]:border-t-0 md:px-8">
                <span className="truncate text-lg tracking-[-0.02em]">{h.name}</span>
                {logos[h.slug] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logos[h.slug]} alt="" className="logo-img h-5 w-auto max-w-[90px] object-contain opacity-70" />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!groups.length && <p className="p-16 text-center text-2xl">No hosts match &ldquo;{q}&rdquo;.</p>}
    </div>
  );
}
