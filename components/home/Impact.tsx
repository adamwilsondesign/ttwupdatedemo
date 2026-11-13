import { stats2026, homecoming } from "@/data/stats";
import { Section, SectionHead } from "@/components/Section";
import { CountUp } from "./CountUp";
import { site } from "@/lib/site.config";
import { Arrow } from "@/components/hero/Hero";
import { VideoPreview } from "./VideoPreview";

export function Impact({ tone = "light", index = "04" }: { tone?: "dark" | "light"; index?: string }) {
  const [lead, ...rest] = stats2026;
  return (
    <Section tone={tone} id="impact">
      <SectionHead
        index={index}
        eyebrow="2026 impact"
        title="Built by Toronto, for the world."
        lede="In just its second year, TTW became a citywide reflection of what makes this ecosystem special: founders, operators, investors, students and creators from 87 countries."
        action={<a href={site.links.impactReport} className="btn btn-ghost">2026 Impact Report <Arrow /></a>}
      />
      <div className="reveal relative overflow-hidden border-t-[1.5px] rule-strong grad-plasma grain text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-volt-300/30 blur-[120px]" />
        <div className="relative grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="flex flex-col justify-between border-b-[1.5px] border-white/30 p-6 md:p-12 lg:border-b-0 lg:border-r-[1.5px]">
            <span className="eyebrow text-volt-100">{lead.label}</span>
            <div className="display mt-10 text-[clamp(4rem,10.5vw,10.5rem)] leading-[0.8]"><CountUp value={lead.value} suffix={lead.suffix} /></div>
          </div>
          <div className="grid grid-cols-2 [&>*]:min-w-0">
            {rest.map((s, i) => (
              <div key={s.label} className={`flex min-h-[190px] flex-col justify-between p-6 md:min-h-[260px] md:p-10 ${i % 2 ? "border-l-[1.5px]" : ""} ${i > 1 ? "border-t-[1.5px]" : ""} border-white/30`}>
                <span className="eyebrow text-volt-100">{s.label}</span>
                <div className="display text-[clamp(2.6rem,5.4vw,5.2rem)]"><CountUp value={s.value} suffix={s.suffix} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative grid border-t-[1.5px] border-white/30 md:grid-cols-2">
          {homecoming.map((h, i) => (
            <div key={h.label} className={`flex items-baseline gap-4 p-6 md:p-8 ${i ? "border-t-[1.5px] md:border-l-[1.5px] md:border-t-0" : ""} border-white/30`}>
              <span className="display text-[clamp(2.2rem,3.6vw,3.4rem)]"><CountUp value={h.value} suffix={h.suffix} /></span>
              <span className="eyebrow text-volt-100">{h.label}</span>
            </div>
          ))}
        </div>
      </div>
      <VideoPreview />
      <div className="h-28 md:h-44" />
    </Section>
  );
}
