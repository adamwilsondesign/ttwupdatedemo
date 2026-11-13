import { presenting, signature, supporting, type Org } from "@/data/sponsors";
import { Section, SectionHead } from "@/components/Section";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site.config";
import type { LogoMap } from "@/lib/logos";

function Tier({ label, orgs, logos, size, cols }: { label: string; orgs: Org[]; logos: LogoMap; size: string; cols: string }) {
  return (
    <div className="reveal grid border-t-[1.5px] rule lg:grid-cols-[260px_1fr]">
      <div className="flex items-center gap-3 px-5 pt-6 pb-2 md:px-10 lg:border-r-[1.5px] lg:rule lg:py-0">
        <span className="h-2.5 w-2.5 rounded-full bg-volt-400 shadow-[0_0_14px_2px_#5c70ff]" />
        <span className="eyebrow">{label}</span>
      </div>
      <div className={`grid ${cols}`}>
        {orgs.map((o, i) => (
          <a key={o.slug + i} href={o.url ?? "#"} className={`group grid place-items-center px-6 transition-colors hover:bg-[var(--surface)] ${size} rule ${orgs.length === 4 ? `${i % 2 ? "border-l-[1.5px]" : ""} ${i === 2 ? "md:border-l-[1.5px]" : ""} ${i > 1 ? "border-t-[1.5px] md:border-t-0" : ""}` : i > 0 ? "border-l-[1.5px]" : ""}`}>
            <Logo org={o} src={logos[o.slug]} className={o.tba ? "h-12 w-40" : o.square ? "h-full !max-h-[72px]" : "h-full max-h-[inherit]"} wordmarkClass="text-[1.6rem]" />
          </a>
        ))}
      </div>
    </div>
  );
}

export function Sponsors({ logos, tone = "light", index = "02" }: { logos: LogoMap; tone?: "dark" | "light"; index?: string }) {
  return (
    <Section tone={tone} id="sponsors">
      <SectionHead
        index={index}
        eyebrow="2027 Sponsors"
        title="Backed by the builders of Toronto."
        action={<a href={site.links.sponsorship} className="btn btn-ghost">Become a sponsor</a>}
      />
      <Tier label="Presenting" orgs={presenting} logos={logos} size="h-40 md:h-52 [&_img]:max-h-12 md:[&_img]:max-h-14" cols="grid-cols-2 md:grid-cols-4" />
      <Tier label="Signature" orgs={signature} logos={logos} size="h-32 md:h-40 [&_img]:max-h-9" cols="grid-cols-2 md:grid-cols-4" />
      <Tier label="Supporting" orgs={supporting} logos={logos} size="h-28 md:h-36 [&_img]:max-h-8" cols="grid-cols-3" />
      <div className="h-28 border-t-[1.5px] rule md:h-40" />
    </Section>
  );
}
