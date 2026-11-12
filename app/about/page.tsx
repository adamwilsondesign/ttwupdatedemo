import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { Impact } from "@/components/home/Impact";

export const metadata: Metadata = { title: "About · Toronto Tech Week" };

const team = [
  ["Julia (Baird) Konefal", "Co-director · Head of Platform & Operations, Golden Ventures"],
  ["Mellonie Truong", "Co-director · Founder, Toronto Tech Fest & Sage Consulting Co"],
  ["Ameet Shah", "General Partner, Golden Ventures"],
  ["Satish Kanwar", "Co-Founder, Good Future"],
  ["Siri Agrell", "Founding Member"],
  ["Taha Hossain", "Founding Member"],
  ["Rachel MacPhail", "Director of Operations & Partnerships"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title={<>Toronto has always been a city of <span className="text-volt-grad">builders.</span></>} />
      <Section tone="light">
        <div className="grid gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2">
          <p className="text-[clamp(1.6rem,2.8vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em]">
            The talent was already here. The creativity was already here. What Toronto lacked was a moment that brought it all together.
          </p>
          <div className="space-y-5 text-[1.1rem] leading-relaxed text-[var(--muted)]">
            <p>In 2024, a small group of volunteer organizers set out to create that moment. Instead of launching another conference, they imagined a week built by the community itself: a decentralized platform where anyone could host an event, share what they&rsquo;re working on, and contribute to the story of what Canadian tech is and can be.</p>
            <p>What started as a simple idea became a movement. TTW has grown into an annual gathering created not top-down, but by the people who make this community thrive. As Toronto continues to build what&rsquo;s next, TTW&rsquo;s mission is to help ensure the world knows.</p>
          </div>
        </div>
      </Section>
      <Section tone="dark">
        <SectionHead index="02" eyebrow="Founding members & team" title="The people behind the week." />
        <ul className="grid border-t-[1.5px] rule sm:grid-cols-2 lg:grid-cols-4">
          {team.map(([n, r], i) => (
            <li key={n} className="flex min-h-[180px] flex-col justify-between border-b-[1.5px] border-r-[1.5px] rule p-6 md:p-8">
              <span className="eyebrow text-[var(--muted)]">{String(i + 1).padStart(2, "0")}</span>
              <div><p className="text-2xl font-medium tracking-[-0.03em]">{n}</p><p className="mt-2 text-sm text-[var(--muted)]">{r}</p></div>
            </li>
          ))}
        </ul>
        <div className="h-16" />
      </Section>
      <Impact />
    </>
  );
}
