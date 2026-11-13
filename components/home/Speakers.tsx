"use client";
import { useRef } from "react";
import { speakers } from "@/data/lineup";
import { Section, SectionHead } from "@/components/Section";
import { Arrow } from "@/components/hero/Hero";

/* Featured speakers: one horizontally scrollable row (≈4½ cards visible on
   desktop). Placeholder headshots get a volt duotone so mixed stock photos
   read as one consistent set. */
export function Speakers({ tone = "light", index = "03" }: { tone?: "dark" | "light"; index?: string }) {
  const row = useRef<HTMLDivElement>(null);
  const page = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector("article");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 16) * 2, behavior: "smooth" });
  };
  return (
    <Section tone={tone} id="speakers">
      <SectionHead
        index={index}
        eyebrow="Featured speakers"
        title="The people building what's next."
        lede="Founders, operators, investors and researchers taking the stage across the week. More announced soon."
        action={
          <div className="flex items-center gap-3">
            <button aria-label="Previous speakers" onClick={() => page(-1)} className="grid h-12 w-12 place-items-center rounded-full border-[1.5px] rule-strong transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]">←</button>
            <button aria-label="Next speakers" onClick={() => page(1)} className="grid h-12 w-12 place-items-center rounded-full border-[1.5px] rule-strong transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]">→</button>
            <a href="#subscribe" className="btn btn-ghost">Get speaker drops <Arrow /></a>
          </div>
        }
      />
      <div ref={row} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--pad)] px-[var(--pad)] pb-6 [scrollbar-width:thin]">
        {speakers.map((s, i) => (
          <article key={s.name} className="group w-[68%] shrink-0 snap-start sm:w-[42%] lg:w-[calc((100%-4rem)/4.5)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border-[1.5px] rule-strong bg-volt-900 transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_0_#d4ff3a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.photo} alt={`${s.name} (placeholder headshot)`} loading={i < 5 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.08] transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-[linear-gradient(160deg,#2e46ff,#070c45)] mix-blend-color" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,15,0.55),transparent_45%)]" />
            </div>
            <div className="px-1 pt-5">
              <p className="text-[1.25rem] font-medium leading-tight tracking-[-0.03em]">{s.name}</p>
              <p className="mt-1 text-[0.92rem] text-[var(--muted)]">{s.title}, {s.company}</p>
              <p className="eyebrow mt-3 text-[0.6rem] text-[var(--accent)]">“{s.topic}”</p>
            </div>
          </article>
        ))}
      </div>
      <div className="h-24 md:h-36" />
    </Section>
  );
}
