import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { Faq } from "@/components/Faq";
import { RailTrack } from "@/components/RailTrack";

export const metadata: Metadata = { title: "FAQ · Toronto Tech Week 2027" };

const general = [
  { q: "What is Toronto Tech Week?", a: "Toronto Tech Week is a weeklong citywide collection of events with a shared purpose to connect and celebrate builders, startups, and companies in the tech community. This is not a traditional conference. It's a decentralized, open platform for anyone to join or host in-person events to globally showcase Toronto as a city where anything is possible to achieve." },
  { q: "When and where is Toronto Tech Week?", a: "Toronto Tech Week 2027 will take place from May 31 – June 4, 2027. Hundreds of independently hosted events will take place across the entire city!" },
  { q: "Who can attend?", a: "Toronto Tech Week is open to anyone interested in the Toronto tech ecosystem: founders, builders, startups, investors, industry partners, tech professionals, students, and more.\n\nEach event is independently hosted, so attendees choose which events to attend and register separately. Events may be free or paid, private or public, and may have an age restriction." },
  { q: "Where can I buy a ticket?", a: "Toronto Tech Week itself does not sell tickets. Each event is independently organized, and each host determines ticketing. Some events are free, others may require a ticket purchase." },
  { q: "Who organizes Toronto Tech Week?", a: "TTW is independently organized and community-led. The platform is led by a local non-profit, Canada Tech Week Organization, whose core team facilitates logistics, marketing and ecosystem support." },
];
const hosting = [
  { q: "How do I host an event?", a: "Apply through the Event Host Application. Once approved, your event joins the official TTW calendar and you get access to hosting resources, partner perks and promotion." },
  { q: "What kinds of events can I host?", a: "Panels, firesides, socials, dinners, demos, hackathons, open houses, workshops and more. If it brings the community together, it belongs at TTW." },
  { q: "Are there perks for hosts?", a: "Yes. Approved hosts unlock Partner Perks: free venues, catering credits, cloud credits, ticketing discounts and more. Visit the Perks page." },
];

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered." />
      <RailTrack>
      <Section tone="light">
        <SectionHead index="01" eyebrow="General" title="The basics." />
        <Faq items={general} />
        <div className="h-16 border-t-[1.5px] rule" />
      </Section>
      <Section tone="light" id="hosting">
        <SectionHead index="02" eyebrow="Hosting" title="Hosting an event." />
        <Faq items={hosting} />
        <div className="h-28 border-t-[1.5px] rule" />
      </Section>
      </RailTrack>
    </>
  );
}
