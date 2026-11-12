import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Sponsors } from "@/components/home/Sponsors";
import { Partners } from "@/components/home/Partners";
import { Section, SectionHead } from "@/components/Section";
import { HostDirectory } from "@/components/partners/HostDirectory";
import { hosts } from "@/data/hosts";
import { getLogoMap } from "@/lib/logos";
import { site } from "@/lib/site.config";
import { Arrow } from "@/components/hero/Hero";

export const metadata: Metadata = { title: "Partners · Toronto Tech Week 2027" };

export default function PartnersPage() {
  const logos = getLogoMap();
  const committed = hosts.filter((h) => h.status === "Committed");
  return (
    <>
      <PageHero eyebrow="Partners" title={<>The organizations building <span className="text-volt-grad">TTW 2027.</span></>}
        lede="Sponsors, founding partners, in-kind partners and every organization committed to host an event this year.">
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={site.links.hostCommitment} className="btn btn-volt">Add Your Organization <Arrow /></a>
          <a href={site.links.sponsorship} className="btn btn-ghost">Become a sponsor</a>
        </div>
      </PageHero>
      <Sponsors logos={logos} />
      <Partners logos={logos} />
      <Section tone="light" id="all-hosts">
        <SectionHead index="04" eyebrow="Committed 2027 hosts" title={<>{committed.length} hosts, A–Z.</>}
          lede="Every organization that has committed to host an event at Toronto Tech Week 2027. Listed alphabetically, updated automatically from Airtable." />
        <HostDirectory hosts={committed} logos={logos} />
        <div className="h-20" />
      </Section>
    </>
  );
}
