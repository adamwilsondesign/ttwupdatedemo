"use client";
import { useState } from "react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul>
      {items.map((it, i) => (
        <li key={it.q} className="border-t-[1.5px] rule">
          <button className="flex w-full items-center justify-between gap-6 px-5 py-6 text-left md:px-10" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span className="text-[clamp(1.2rem,2vw,1.7rem)] font-medium tracking-[-0.03em]">{it.q}</span>
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-[1.5px] rule-strong transition-transform duration-500 ${open === i ? "rotate-45 bg-volt text-white border-volt" : ""}`}>+</span>
          </button>
          <div className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden"><p className="max-w-[70ch] whitespace-pre-line px-5 pb-8 text-[1.05rem] leading-relaxed text-[var(--muted)] md:px-10">{it.a}</p></div>
          </div>
        </li>
      ))}
    </ul>
  );
}
