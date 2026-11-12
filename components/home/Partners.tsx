import { founding, inKind, type Org } from "@/data/sponsors";
import { Section, SectionHead } from "@/components/Section";
import { Logo } from "@/components/Logo";
import type { LogoMap } from "@/lib/logos";

function Group({ title, code, orgs, logos }: { title: string; code: string; orgs: Org[]; logos: LogoMap }) {
  return (
    <div className="reveal">
      <div className="flex items-center justify-between border-t-[1.5px] rule-strong px-5 py-4 md:px-10">
        <span className="eyebrow">{title}</span>
        <span className="eyebrow text-[var(--muted)]">{String(orgs.length).padStart(2, "0")}</span>
      </div>
      <div className="grid grid-cols-2 border-t-[1.5px] rule lg:grid-cols-4">
        {orgs.map((o, i) => (
          <div key={o.slug} className={`group relative flex h-52 flex-col justify-between p-5 transition-colors duration-300 hover:bg-volt hover:text-white md:h-60 md:p-7 ${i % 2 ? "border-l-[1.5px]" : ""} ${i > 1 ? "border-t-[1.5px] lg:border-t-0" : ""} ${i === 2 ? "lg:border-l-[1.5px]" : ""} rule`}>
            <span className="eyebrow text-[var(--muted)] group-hover:text-volt-100">{code}/{String(i + 1).padStart(2, "0")}</span>
            <div className="group-hover:[&_img]:![filter:brightness(0)_invert(1)]">
              <Logo org={o} src={logos[o.slug]} className="h-10 md:h-12" wordmarkClass="text-[1.7rem] md:text-[2rem] text-left" />
            </div>
            <span className="text-[0.95rem] text-[var(--muted)] group-hover:text-volt-100">{o.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Partners({ logos }: { logos: LogoMap }) {
  return (
    <Section tone="light" id="partners">
      <SectionHead index="03" eyebrow="Founding & in-kind partners" title="The people who made TTW possible." />
      <Group title="Founding Partners" code="FP" orgs={founding} logos={logos} />
      <Group title="In-Kind Partners" code="IK" orgs={inKind} logos={logos} />
      <div className="h-20 border-t-[1.5px] rule md:h-28" />
    </Section>
  );
}
