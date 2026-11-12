import { Hero } from "@/components/hero/Hero";
import { Hosts } from "@/components/home/Hosts";
import { Sponsors } from "@/components/home/Sponsors";
import { Partners } from "@/components/home/Partners";
import { Impact } from "@/components/home/Impact";
import { SocialWall } from "@/components/home/SocialWall";
import { getLogoMap } from "@/lib/logos";

export default function Home() {
  const logos = getLogoMap();
  return (
    <>
      <Hero logos={logos} />
      <Hosts logos={logos} />
      <Sponsors logos={logos} />
      <Partners logos={logos} />
      <Impact />
      <SocialWall />
    </>
  );
}
