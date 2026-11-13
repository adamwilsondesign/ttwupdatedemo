import Link from "next/link";
import { Section, SectionHead } from "@/components/Section";
import { Faq } from "@/components/Faq";
import { Arrow } from "@/components/hero/Hero";

const faqs = [
  { q: "When is Toronto Tech Week happening?", a: "Toronto Tech Week 2027 takes place May 31 – June 4, 2027." },
  { q: "Where will Toronto Tech Week take place?", a: "Everywhere. Hundreds of independently hosted events take place across the entire city, from King West to the Beaches." },
  { q: "Who can attend Toronto Tech Week?", a: "Anyone interested in the Toronto tech ecosystem: founders, builders, investors, operators, students and more. Each event is independently hosted, so you register for events separately." },
  { q: "Where can I find the event lineup?", a: "The full lineup will be published here closer to the week. Subscribe to get it first." },
  { q: "Where can I buy a ticket?", a: "Toronto Tech Week doesn't sell tickets. Each host sets their own ticketing. Many events are free." },
  { q: "Who is the organizer of Toronto Tech Week?", a: "TTW is community-led. The platform is run by a local non-profit, Canada Tech Week Organization, with a network of hosts, partners and sponsors." },
];

export function AboutFaq({ tone = "light", index = "06" }: { tone?: "dark" | "light"; index?: string }) {
  return (
    <Section tone={tone} id="faq">
      <SectionHead index={index} eyebrow="About Toronto Tech Week" title={<>Toronto builds.<br />It always has.</>} />
      <div className="grid border-t-[1.5px] rule-strong lg:grid-cols-2">
        <div className="reveal space-y-5 px-[var(--pad)] py-10 font-mono text-[0.95rem] uppercase leading-relaxed tracking-[0.04em] text-[var(--muted)] md:py-14 lg:border-r-[1.5px] lg:rule">
          <p>This city produces remarkable talent and world-class companies. It is a place defined by creativity, resilience and momentum.</p>
          <p>Toronto Tech Week is more than a gathering. <span className="text-[var(--fg)]">It is a celebration</span> of the city that shaped us, the possibilities unfolding here, and the future we are building together.</p>
          <p>It is a moment for Toronto to see itself, to recognize its strength, its impact and its community.</p>
          <p className="text-[var(--fg)]">And we invite you to be part of it.</p>
        </div>
        <div className="reveal">
          <div className="flex items-center justify-between border-t-[1.5px] rule px-[var(--pad)] py-5 lg:border-t-0">
            <span className="eyebrow">FAQs</span>
            <Link href="/faq/" className="eyebrow link-u inline-flex items-center gap-2">View all <Arrow /></Link>
          </div>
          <Faq items={faqs} />
        </div>
      </div>
      <div className="h-28 border-t-[1.5px] rule md:h-40" />
    </Section>
  );
}
