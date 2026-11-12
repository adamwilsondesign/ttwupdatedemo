import { stats2026, homecoming } from "@/data/stats";
import { Section, SectionHead } from "@/components/Section";
import { CountUp } from "./CountUp";
import { site } from "@/lib/site.config";
import { Arrow } from "@/components/hero/Hero";

export function Impact() {
  const [lead, ...rest] = stats2026;
  return (
    <Section tone="dark" id="about">
      <SectionHead
        index="04"
        eyebrow="2026 impact"
        title="Built by Toronto, for the world."
        lede="In just its second year, TTW became a citywide reflection of what makes this ecosystem special: founders, operators, investors, students and creators from 87 countries."
        action={<a href={site.links.impactReport} className="btn btn-ghost">2026 Impact Report <Arrow /></a>}
      />
      <div className="reveal relative overflow-hidden border-t-[1.5px] rule-strong grad-plasma grain text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-volt-300/30 blur-[120px]" />
        <div className="relative grid lg:grid-cols-[1.25fr_1fr]">
          <div className="flex flex-col justify-between border-b-[1.5px] border-white/30 p-6 md:p-10 lg:border-b-0 lg:border-r-[1.5px]">
            <span className="eyebrow text-volt-100">{lead.label}</span>
            <div className="display mt-10 text-[clamp(5rem,15vw,15rem)] leading-[0.8]"><CountUp value={lead.value} suffix={lead.suffix} /></div>
          </div>
          <div className="grid grid-cols-2">
            {rest.map((s, i) => (
              <div key={s.label} className={`flex min-h-[170px] flex-col justify-between p-6 md:min-h-[220px] md:p-8 ${i % 2 ? "border-l-[1.5px]" : ""} ${i > 1 ? "border-t-[1.5px]" : ""} border-white/30`}>
                <span className="eyebrow text-volt-100">{s.label}</span>
                <div className="display text-[clamp(3rem,6vw,5.5rem)]"><CountUp value={s.value} suffix={s.suffix} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative grid border-t-[1.5px] border-white/30 md:grid-cols-[1fr_1fr_auto]">
          {homecoming.map((h, i) => (
            <div key={h.label} className={`flex items-baseline gap-4 p-6 md:p-8 ${i ? "border-t-[1.5px] md:border-l-[1.5px] md:border-t-0" : ""} border-white/30`}>
              <span className="display text-[clamp(2.2rem,3.6vw,3.4rem)]"><CountUp value={h.value} suffix={h.suffix} /></span>
              <span className="eyebrow text-volt-100">{h.label}</span>
            </div>
          ))}
          <a href={site.links.homecoming} className="group flex items-center justify-between gap-6 border-t-[1.5px] border-white/30 p-6 transition-colors hover:bg-white hover:text-volt-700 md:border-l-[1.5px] md:border-t-0 md:p-8">
            <span className="eyebrow">Relive Homecoming</span>
            <span className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-current">▶</span>
          </a>
        </div>
      </div>
      <div className="h-20 md:h-28" />
    </Section>
  );
}
