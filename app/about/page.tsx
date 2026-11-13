import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { Impact } from "@/components/home/Impact";
import { RailTrack } from "@/components/RailTrack";

export const metadata: Metadata = { title: "About · Toronto Tech Week" };

const team = [
  ["Julia (Baird) Konefal", "Co-director · Head of Platform & Operations, Golden Ventures", "julia"],
  ["Mellonie Truong", "Co-director · Founder, Toronto Tech Fest & Sage Consulting Co", "mell"],
  ["Ameet Shah", "General Partner, Golden Ventures", "ameet"],
  ["Satish Kanwar", "Co-Founder, Good Future", "satish"],
  ["Siri Agrell", "Founding Member", "siri"],
  ["Taha Hossain", "Founding Member", "taha"],
  ["Rachel MacPhail", "Director of Operations & Partnerships", "rachel"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title={<>Toronto has always been a city of <span className="text-volt-grad">builders.</span></>} />
      <RailTrack>
      <Section tone="light">
        <div className="grid gap-10 px-[var(--pad)] py-20 md:px-10 md:py-28 lg:grid-cols-2">
          <p className="text-[clamp(1.6rem,2.8vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em]">
            The talent was already here. The creativity was already here. What Toronto lacked was a moment that brought it all together.
          </p>
          <div className="space-y-5 text-[1.1rem] leading-relaxed text-[var(--muted)]">
            <p>In 2024, a small group of volunteer organizers set out to create that moment. Instead of launching another conference, they imagined a week built by the community itself: a decentralized platform where anyone could host an event, share what they&rsquo;re working on, and contribute to the story of what Canadian tech is and can be.</p>
            <p>What started as a simple idea became a movement. TTW has grown into an annual gathering created not top-down, but by the people who make this community thrive. As Toronto continues to build what&rsquo;s next, TTW&rsquo;s mission is to help ensure the world knows.</p>
          </div>
        </div>
      </Section>
      <Section tone="light">
        <SectionHead index="02" eyebrow="Founding members & team" title="The people behind the week." />
        <ul className="grid grid-cols-2 gap-[1.5px] border-y-[1.5px] rule bg-[var(--line)] lg:grid-cols-4">
          {team.map(([n, r, img]) => (
            <li key={n} className="group bg-[var(--bg)] p-3 md:p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border-[1.5px] rule-strong bg-volt-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/team/${img}.jpg`} alt={n} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0" />
              </div>
              <div className="px-1 pt-4 pb-2">
                <p className="text-[1.25rem] font-medium leading-tight tracking-[-0.03em]">{n}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{r}</p>
              </div>
            </li>
          ))}
          {/* close the grid cleanly (7 people → one empty tile) */}
          <li aria-hidden className="bg-[var(--bg)]" />
        </ul>
        <div className="h-16" />
      </Section>
      <Impact tone="dark" index="03" />
      </RailTrack>
    </>
  );
}
