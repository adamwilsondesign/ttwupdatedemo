import { Hero } from "@/components/hero/Hero";
import { Hosts } from "@/components/home/Hosts";
import { Events } from "@/components/home/Events";
import { Speakers } from "@/components/home/Speakers";
import { Sponsors } from "@/components/home/Sponsors";
import { Partners } from "@/components/home/Partners";
import { Impact } from "@/components/home/Impact";
import { SocialWall } from "@/components/home/SocialWall";
import { AboutFaq } from "@/components/home/AboutFaq";
import { RailTrack } from "@/components/RailTrack";
import { getLogoMap } from "@/lib/logos";

// Tone rhythm: two swaps only — night (hero, hosts, events) → day (speakers,
// sponsors, partners, about/faq) → night (impact, community, footer).
export default function Home() {
  const logos = getLogoMap();
  return (
    <>
      <Hero logos={logos} />
      <RailTrack>
        <Hosts logos={logos} tone="dark" />
        <Events tone="dark" index="02" />
        <Speakers tone="light" index="03" />
        <Sponsors logos={logos} tone="light" index="04" />
        <Partners logos={logos} tone="light" index="05" />
        <AboutFaq tone="light" index="06" />
        <Impact tone="dark" index="07" />
        <SocialWall tone="dark" />
      </RailTrack>
    </>
  );
}
