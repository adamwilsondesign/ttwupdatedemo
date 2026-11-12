import { founding, inKind, type Org } from "@/data/sponsors";
import { Section, SectionHead } from "@/components/Section";
import { Logo } from "@/components/Logo";
import type { LogoMap } from "@/lib/logos";

function Group({ title, code, orgs, logos }: { title: string; code: string; orgs: Org[]; logos: LogoMap }) {
  return (
    <div className="reveal">
      <div className="flex items-center justify-between border-t-[1.5px] rule-strong px-[var(--pad)] py-5">
        <span className="eyebrow">{title}</span>
        <span className="eyebrow text-[var(--muted)]">{String(orgs.length).padStart(2, "0")}</span>
      </div>
      <div className="grid grid-cols-2 gap-[1.5px] border-t-[1.5px] rule bg-[var(--line)] lg:grid-cols-4">
        {orgs.map((o, i) => (
          <div key={o.slug} className="group relative flex h-56 flex-col justify-between bg-[var(--bg)] p-5 transition-colors duration-300 hover:bg-volt hover:text-white md:h-72 md:p-8">
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

export function Partners({ logos, tone = "light", index = "03" }: { logos: LogoMap; tone?: "dark" | "light"; index?: string }) {
  return (
    <Section tone={tone} id="partners">
      <SectionHead index={index} eyebrow="Founding & in-kind partners" title="The people who made TTW possible." />
      <Group title="Founding Partners" code="FP" orgs={founding} logos={logos} />
      <Group title="In-Kind Partners" code="IK" orgs={inKind} logos={logos} />
      <div className="h-28 border-t-[1.5px] rule md:h-40" />
    </Section>
  );
}
