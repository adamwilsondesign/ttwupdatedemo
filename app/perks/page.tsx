import type { Metadata } from "next";
import { PerksClient } from "@/components/perks/PerksClient";
import { approvedPerks } from "@/data/perks";
import { getLogoMap } from "@/lib/logos";

export const metadata: Metadata = { title: "Partner Perks · Toronto Tech Week 2027" };

export default function PerksPage() {
  return <PerksClient perks={approvedPerks} logos={getLogoMap()} />;
}
