"use client";
import { useEffect, useMemo, useState } from "react";
import type { HostRecord } from "@/data/hosts";
import type { LogoMap } from "@/lib/logos";
import { Logo } from "@/components/Logo";

const LETTERS = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const keyOf = (name: string) => (/[a-z]/i.test(name[0]) ? name[0].toUpperCase() : "#");

/* Every committed host as a logo tile, A–Z. The search bar doubles as the
   letter index: type to filter, or jump to a letter anchor. Each letter group
   opens with a letter tile that is the anchor target, so the grid never breaks. */
export function HostGrid({ hosts, logos }: { hosts: HostRecord[]; logos: LogoMap }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    const g = new Map<string, HostRecord[]>();
    for (const h of hosts) {
      if (t && !h.name.toLowerCase().includes(t)) continue;
      const k = keyOf(h.name);
      g.set(k, [...(g.get(k) ?? []), h]);
    }
    return [...g.entries()];
  }, [hosts, q]);
  const present = new Set(groups.map(([k]) => k));
  const count = groups.reduce((s, [, l]) => s + l.length, 0);

  // highlight the letter group currently in view: the last letter tile that
  // has crossed 40% of the viewport, defaulting to the first group (#, then A)
  useEffect(() => {
    const update = () => {
      const tiles = Array.from(document.querySelectorAll<HTMLElement>("[data-letter]"));
      if (!tiles.length) return;
      let cur = tiles[0].dataset.letter!;
      for (const t of tiles) if (t.getBoundingClientRect().top < window.innerHeight * 0.4) cur = t.dataset.letter!;
      setActive(cur);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [groups]);

  const jump = (l: string) => {
    if (q) setQ("");
    requestAnimationFrame(() => {
      const el = document.getElementById(`hosts-${l === "#" ? "0" : l}`);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 180, behavior: "smooth" });
    });
  };

  return (
    <div>
      {/* search + letter index in one bar */}
      <div className="z-30 border-t-[1.5px] rule-strong bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] px-[var(--pad)] py-4 backdrop-blur-xl lg:sticky lg:top-[88px]">
        <div className="flex flex-col gap-2 rounded-[28px] border-[1.5px] rule-strong bg-[var(--surface)] p-2 lg:flex-row lg:items-center lg:rounded-full">
          <label className="flex h-11 shrink-0 items-center gap-3 px-4 lg:w-[260px] lg:border-r-[1.5px] lg:rule">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.75" /><path d="m11 11 4 4" stroke="currentColor" strokeWidth="1.75" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${hosts.length} hosts`} aria-label="Search hosts"
              className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--muted)]" />
            {q && <button onClick={() => setQ("")} className="eyebrow text-[var(--muted)] hover:text-[var(--fg)]" aria-label="Clear search">✕</button>}
          </label>
          <nav aria-label="Jump to letter" className="flex flex-1 flex-wrap justify-between gap-y-1 px-2">
            {LETTERS.map((l) => {
              const on = present.has(l);
              return (
                <a key={l} href={on ? `#hosts-${l === "#" ? "0" : l}` : undefined}
                  onClick={(e) => { if (!on) return; e.preventDefault(); jump(l); }}
                  aria-disabled={!on}
                  className={`grid h-7 w-7 place-items-center rounded-full font-mono text-[0.68rem] transition-colors ${
                    active === l && on ? "bg-signal text-[#04050d]" : on ? "hover:bg-[var(--fg)] hover:text-[var(--bg)]" : "pointer-events-none opacity-25"
                  }`}>{l}</a>
              );
            })}
          </nav>
          <span className="eyebrow hidden shrink-0 px-4 text-[var(--muted)] 2xl:inline">{count} / {hosts.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[1.5px] border-y-[1.5px] rule bg-[var(--line)] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {groups.map(([k, list]) => [
          <div key={`L${k}`} id={`hosts-${k === "#" ? "0" : k}`} data-letter={k}
            className="relative flex h-32 scroll-mt-48 flex-col justify-between bg-[var(--bg)] p-5 md:h-40">
            <span className="eyebrow text-[var(--muted)]">{list.length} {list.length === 1 ? "host" : "hosts"}</span>
            <span className="display text-[4.2rem] leading-none text-volt-grad md:text-[5.5rem]">{k}</span>
          </div>,
          ...list.map((h) => (
            <div key={h.id} title={h.name} className="group grid h-32 place-items-center bg-[var(--bg)] px-7 transition-colors duration-300 hover:bg-volt md:h-40">
              <div className="w-full group-hover:text-white group-hover:[&_img]:![filter:brightness(0)_invert(1)]">
                <Logo org={h} src={logos[h.slug]} className="h-10 max-w-[78%] md:h-12" wordmarkClass="text-[1.05rem] md:text-[1.25rem] whitespace-normal leading-tight line-clamp-2" />
              </div>
            </div>
          )),
        ])}
      </div>
      {!count && <p className="p-16 text-center text-2xl">No hosts match &ldquo;{q}&rdquo;.</p>}
    </div>
  );
}
