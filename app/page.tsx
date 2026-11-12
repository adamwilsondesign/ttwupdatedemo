import { Hero } from "@/components/hero/Hero";
import { Hosts } from "@/components/home/Hosts";
import { Sponsors } from "@/components/home/Sponsors";
import { Partners } from "@/components/home/Partners";
import { Impact } from "@/components/home/Impact";
import { SocialWall } from "@/components/home/SocialWall";
import { RailTrack } from "@/components/RailTrack";
import { getLogoMap } from "@/lib/logos";

// Tone rhythm: two swaps only — night (hero + hosts) → day (sponsors,
// partners, impact) → night (community + footer).
export default function Home() {
  const logos = getLogoMap();
  return (
    <>
      <Hero logos={logos} />
      <RailTrack>
        <Hosts logos={logos} tone="dark" />
        <Sponsors logos={logos} tone="light" />
        <Partners logos={logos} tone="light" />
        <Impact tone="light" />
        <SocialWall tone="dark" />
      </RailTrack>
    </>
  );
}
