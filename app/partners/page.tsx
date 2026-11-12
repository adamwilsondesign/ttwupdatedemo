import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Sponsors } from "@/components/home/Sponsors";
import { Partners } from "@/components/home/Partners";
import { Section, SectionHead } from "@/components/Section";
import { HostGrid } from "@/components/partners/HostGrid";
import { RailTrack } from "@/components/RailTrack";
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
          <a href={site.links.hostCommitment} className="btn btn-signal">Add Your Organization <Arrow /></a>
          <a href={site.links.sponsorship} className="btn btn-ghost">Become a sponsor</a>
        </div>
      </PageHero>
      <RailTrack>
      <Sponsors logos={logos} tone="light" index="01" />
      <Partners logos={logos} tone="light" index="02" />
      <Section tone="light" id="all-hosts">
        <SectionHead index="03" eyebrow="Committed 2027 hosts" title={<>{committed.length} hosts and counting.</>}
          lede="Every organization that has committed to host an event at Toronto Tech Week 2027. Listed alphabetically, updated automatically from Airtable." />
        <HostGrid hosts={committed} logos={logos} />
        <div className="h-28 md:h-40" />
      </Section>
      </RailTrack>
    </>
  );
}
