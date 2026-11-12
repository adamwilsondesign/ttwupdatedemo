"use client";
import { useState } from "react";
import { days, events } from "@/data/lineup";
import { Section, SectionHead } from "@/components/Section";
import { Arrow } from "@/components/hero/Hero";

/* Featured events as a transit departures board: pick a day, read the
   timetable. Flagship events glow in Signal. */
export function Events({ tone = "dark", index = "02" }: { tone?: "dark" | "light"; index?: string }) {
  const [day, setDay] = useState(0);
  const list = events.filter((e) => e.day === day);
  return (
    <Section tone={tone} id="events">
      <SectionHead
        index={index}
        eyebrow="Featured events"
        title="Upcoming events."
        lede="Hundreds of independent, community-led events across the city. A preview of what's on. The full calendar opens closer to the week."
        action={<a href="#subscribe" className="btn btn-ghost">Get the full calendar <Arrow /></a>}
      />
      {/* flagship */}
      <div className="reveal grid border-t-[1.5px] rule-strong lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="relative overflow-hidden grad-plasma grain p-6 text-white md:p-10">
          <p className="eyebrow text-volt-100">Flagship · Fri Jun 4 · 7:00 PM</p>
          <p className="display mt-6 text-[clamp(3rem,5vw,4.6rem)]">Homecoming</p>
          <p className="eyebrow mt-3 text-signal">History · Leslieville</p>
          <svg viewBox="0 0 300 70" className="mt-8 w-full" aria-hidden>
            <line x1="0" y1="62" x2="300" y2="62" stroke="#eef1ff" strokeWidth="2" />
            <rect x="40" y="18" width="220" height="38" rx="12" fill="#05060f" stroke="#eef1ff" strokeWidth="2" />
            {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={54 + i * 25} y={26} width={18} height={14} rx={2} fill="#2e46ff" />)}
            <circle cx="70" cy="60" r="5" fill="#05060f" stroke="#eef1ff" strokeWidth="2" /><circle cx="230" cy="60" r="5" fill="#05060f" stroke="#eef1ff" strokeWidth="2" />
          </svg>
        </div>
        <div className="flex flex-col justify-between gap-8 border-t-[1.5px] rule p-6 md:p-10 lg:border-l-[1.5px] lg:border-t-0">
          <div>
            <h3 className="text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-[1] tracking-[-0.035em]">Toronto Tech Week 2027: Homecoming</h3>
            <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed text-[var(--muted)]">
              The official main stage of Toronto Tech Week returns for its third year, uniting more than 1,000 of Canada&rsquo;s top builders at History in the east end. Conversations and connections featuring the best in the business.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow inline-flex h-11 items-center gap-2 rounded-full border-[1.5px] rule-strong px-4">⌖ The Beaches</span>
            <a href="#subscribe" className="btn btn-ghost h-11">Add to schedule</a>
            <a href="#subscribe" className="btn btn-signal h-11">Register <Arrow /></a>
          </div>
        </div>
      </div>

      <div className="reveal border-t-[1.5px] rule-strong">
        <div className="grid grid-cols-5 border-b-[1.5px] rule" role="tablist" aria-label="Event day">
          {days.map((d) => (
            <button key={d.n} role="tab" aria-selected={day === d.n} onClick={() => setDay(d.n)}
              className={`group relative flex flex-col items-start gap-1 px-3 py-5 text-left transition-colors md:px-[var(--pad)] md:py-7 ${d.n ? "border-l-[1.5px] rule" : ""} ${day === d.n ? "bg-volt text-white" : "hover:bg-[var(--surface)]"}`}>
              <span className={`eyebrow text-[0.6rem] md:text-xs ${day === d.n ? "text-volt-100" : "text-[var(--muted)]"}`}>Day {d.n + 1} · {d.label}</span>
              <span className="text-[1.15rem] font-medium tracking-[-0.03em] md:text-[2rem]">{d.date}</span>
              {day === d.n && <span className="absolute inset-x-0 bottom-0 h-1 bg-signal" />}
            </button>
          ))}
        </div>
        <ul key={day}>
          {list.map((e, i) => (
            <li key={e.id} className="group grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b-[1.5px] rule px-[var(--pad)] py-6 transition-colors hover:bg-[var(--surface)] md:grid-cols-[110px_1fr_220px_160px_auto] md:gap-8 md:py-8"
              style={{ animation: `rise 600ms ${i * 70}ms var(--ease-out-expo) both` }}>
              <span className="font-mono text-[1.1rem] tabular-nums md:text-[1.6rem]">{e.time}</span>
              <div className="min-w-0">
                <p className={`text-[1.15rem] font-medium leading-tight tracking-[-0.03em] md:text-[1.7rem] ${e.tag === "Flagship" ? "text-signal" : ""}`}>{e.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)] md:hidden">{e.venue} · {e.host}</p>
              </div>
              <div className="hidden md:block">
                <p className="text-[0.95rem]">{e.venue}</p>
                <p className="eyebrow mt-1 text-[0.62rem] text-[var(--muted)]">{e.area}</p>
              </div>
              <div className="hidden md:block">
                <p className="eyebrow text-[0.62rem] text-[var(--muted)]">Host</p>
                <p className="mt-1 text-[0.95rem]">{e.host}</p>
              </div>
              <span className={`eyebrow justify-self-end rounded-full border-[1.5px] px-3 py-1.5 text-[0.6rem] ${e.tag === "Flagship" ? "border-signal bg-signal text-[#04050d]" : "rule-strong"}`}>{e.tag}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center border-b-[1.5px] rule py-8">
        <a href="#subscribe" className="btn btn-ghost">View full schedule <Arrow /></a>
      </div>
      <div className="h-28 md:h-40" />
    </Section>
  );
}
