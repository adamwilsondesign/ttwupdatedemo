import Link from "next/link";
import { hosts } from "@/data/hosts";
import { Section, SectionHead } from "@/components/Section";
import { Logo } from "@/components/Logo";
import { Arrow } from "@/components/hero/Hero";
import { site } from "@/lib/site.config";
import type { LogoMap } from "@/lib/logos";

export function Hosts({ logos, tone = "dark" }: { logos: LogoMap; tone?: "dark" | "light" }) {
  const committed = hosts.filter((h) => h.status === "Committed");
  const featured = committed.filter((h) => h.featureOnHomepage);
  const half = Math.ceil(featured.length / 2);
  const rows = [featured.slice(0, half), featured.slice(half)];
  const count = Math.floor(committed.length / 50) * 50; // "150+", "200+"… rounds down automatically

  return (
    <Section tone={tone} id="hosts">
      <SectionHead
        index="01"
        eyebrow="Committed 2027 hosts"
        title={<><span className="text-volt-grad">{count}+</span> organizations are already in.</>}
        lede="Startups, scale-ups, investors, nonprofits and institutions have committed to host events across Toronto from May 31 to June 4. Add yours to the map."
        action={
          <div className="flex flex-wrap gap-3">
            <a href={site.links.hostCommitment} className="btn btn-signal">Add Your Organization <Arrow /></a>
            <Link href="/partners/#all-hosts" className="btn btn-ghost">See all {committed.length}</Link>
          </div>
        }
      />
      <div className="marquee-wrap mask-x border-y-[1.5px] rule-strong">
        {rows.map((row, ri) => (
          <div key={ri} className={`overflow-hidden ${ri === 0 ? "border-b-[1.5px] rule" : ""}`}>
            <div className={`marquee ${ri === 1 ? "rev" : ""}`} style={{ ["--dur" as string]: `${row.length * 3.2}s` }}>
              {[...row, ...row].map((h, i) => (
                <div key={`${h.id}-${i}`} className="group grid h-[120px] w-[210px] shrink-0 place-items-center border-r-[1.5px] rule px-7 transition-colors duration-300 hover:bg-volt md:h-[156px] md:w-[260px]">
                  <div className="w-full transition-colors group-hover:text-white group-hover:[&_img]:![filter:brightness(0)_invert(1)]">
                    <Logo org={h} src={logos[h.slug]} className="h-8 md:h-9" wordmarkClass="text-[1.05rem] md:text-[1.2rem]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="h-28 md:h-44" />
    </Section>
  );
}
