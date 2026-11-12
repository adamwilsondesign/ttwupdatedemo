"use client";
import { useState } from "react";
import { Modal } from "./Modal";
import type { Perk } from "@/data/perks";
import { Logo } from "@/components/Logo";
import { CategoryTag, valueLabel } from "./PerksClient";
import { track } from "@/lib/analytics";
import { Arrow } from "@/components/hero/Hero";

export function RedeemModal({ perk, logo, onClose }: { perk: Perk | null; logo?: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  if (!perk) return null;
  const copy = async () => {
    try { await navigator.clipboard.writeText(perk.code); } catch {}
    setCopied(true);
    track("perk_redeem", { perk_id: perk.id, partner: perk.partner, action: "copy_code" });
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <Modal open={!!perk} onClose={() => { setCopied(false); onClose(); }} label={`Redeem ${perk.partner} perk`}>
      <div className="relative overflow-hidden grad-plasma grain p-6 pt-12 text-white sm:p-10 sm:pt-14">
        <div className="logo-on-volt h-10 w-44"><Logo org={{ name: perk.partner, slug: perk.partnerSlug }} src={logo} className="!mx-0 h-10" wordmarkClass="text-2xl text-left" /></div>
        <p className="eyebrow mt-8 text-volt-100">{valueLabel(perk)}</p>
        <h2 className="mt-2 text-[2.2rem] font-medium leading-[1] tracking-[-0.04em]">{perk.title}</h2>
      </div>
      <div className="p-6 sm:p-10">
        <div className="flex flex-wrap gap-2"><CategoryTag c={perk.category} small />{perk.audience.map((a) => <span key={a} className="eyebrow rounded-full border-[1.5px] rule px-2 py-0.5 text-[0.6rem]">For {a}</span>)}</div>
        <p className="mt-4 text-[var(--muted)]">{perk.description}</p>

        <p className="eyebrow mt-8 text-[var(--muted)]">Your code</p>
        <button onClick={copy} className="mt-2 flex h-16 w-full items-center justify-between rounded-2xl border-[1.5px] border-dashed border-volt bg-[color-mix(in_srgb,#2e46ff_8%,transparent)] px-5 font-mono text-xl tracking-[0.14em]">
          {perk.code}
          <span className="eyebrow text-[0.65rem] text-[var(--accent)]">{copied ? "Copied ✓" : "Copy"}</span>
        </button>

        <ol className="mt-8 space-y-3">
          {["Copy your code above.", `Visit ${perk.partner} and start sign-up or checkout.`, "Apply the code. Questions? partners@torontotechweek.com"].map((s, i) => (
            <li key={i} className="flex gap-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-[1.5px] rule-strong font-mono text-xs">{i + 1}</span><span className="pt-0.5">{s}</span></li>
          ))}
        </ol>

        <a href={perk.redeemUrl} target="_blank" rel="noreferrer" onClick={() => track("perk_redeem", { perk_id: perk.id, partner: perk.partner, action: "outbound" })} className="btn btn-volt mt-8 w-full">
          Go to {perk.partner} <Arrow />
        </a>
        <p className="mt-4 text-xs text-[var(--muted)]">{perk.terms}</p>
      </div>
    </Modal>
  );
}
