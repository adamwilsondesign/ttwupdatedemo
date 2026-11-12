"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site.config";
import { track } from "@/lib/analytics";
import { FooterWordmark } from "@/components/FooterWordmark";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer data-tone="dark" id="subscribe" className="relative overflow-x-clip">
      <div className="frame mx-auto max-w-[1440px] border-t-[1.5px] rule-strong">
        <span className="cross -left-[9px] -top-[9px]" />
        <span className="cross -right-[9px] -top-[9px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_80%_at_50%_100%,rgba(46,70,255,0.55),transparent_70%)]" />

        <div className="relative grid gap-12 px-5 pt-20 pb-16 md:px-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow mb-6 text-[var(--muted)]">Stay in the loop</p>
            <h2 className="h-section max-w-[16ch]">Toronto is open. <span className="text-volt-grad">Join a week of ideas, connections and possibility.</span></h2>
          </div>
          <form
            className="min-w-0 self-end"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: POST to beehiiv subscribe endpoint (site.links.beehiivSubscribe)
              track("newsletter_subscribe", { source: "footer" });
              setDone(true);
            }}
          >
            <label htmlFor="footer-email" className="eyebrow text-[var(--muted)]">Get host deadlines, lineup drops &amp; perks</label>
            <div className="mt-4 flex items-center gap-2 rounded-full border-[1.5px] rule-strong p-1.5 focus-within:border-volt-400">
              <input id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
                className="h-11 w-0 min-w-0 flex-1 bg-transparent px-4 text-lg outline-none placeholder:text-[var(--muted)]" />
              <button className="btn btn-signal h-11 shrink-0 px-4 sm:px-6">{done ? "Subscribed ✓" : "Subscribe"}</button>
            </div>
          </form>
        </div>

        <div className="relative grid border-t-[1.5px] rule md:grid-cols-4">
          {[
            { h: "Explore", l: [["About", "/about/"], ["Partners", "/partners/"], ["Perks", "/perks/"], ["FAQ", "/faq/"]] },
            { h: "Host", l: [["Apply to Host", site.links.applyToHost], ["Add your organization", site.links.hostCommitment], ["Hosting resources", site.links.hostingResources]] },
            { h: "Follow", l: [["LinkedIn", site.social.linkedin], ["Instagram", site.social.instagram], ["X / Twitter", site.social.x]] },
            { h: "2026", l: [["Impact Report", site.links.impactReport], ["Relive Homecoming", site.links.homecoming]] },
          ].map((c, i) => (
            <div key={c.h} className={`p-5 md:p-10 ${i ? "border-t-[1.5px] md:border-l-[1.5px] md:border-t-0" : ""} rule`}>
              <p className="eyebrow mb-5 text-[var(--muted)]">{c.h}</p>
              <ul className="space-y-2">
                {c.l.map(([label, href]) => <li key={label}><Link href={href} className="link-u text-lg">{label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="eyebrow relative flex flex-col items-center justify-between gap-3 border-t-[1.5px] rule px-5 py-5 text-[var(--muted)] md:flex-row md:px-10">
          <span>©Toronto Tech Week 2027 · Canada Tech Week Organization</span>
          <a href="https://lazertechnologies.com" className="link-u hover:text-[var(--fg)]">Made by Lazer</a>
        </div>
        <div className="relative border-t-[1.5px] rule pt-8">
          <FooterWordmark />
        </div>
      </div>
    </footer>
  );
}
