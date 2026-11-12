"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site.config";

const left = [
  { label: "About", href: "/about/" },
  { label: "Partners", href: "/partners/" },
  { label: "Perks", href: "/perks/" },
];
const right = [
  { label: "FAQ", href: "/faq/" },
  { label: "2026 Impact Report", href: site.links.impactReport },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <nav
        className={`mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center rounded-full border-[1.5px] px-3 transition-all duration-500 md:px-4 ${
          scrolled ? "border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <ul className="hidden items-center gap-1 md:flex">
          {left.map((l) => (
            <li key={l.label}><Link href={l.href} className="rounded-full px-4 py-2 text-[0.95rem] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]">{l.label}</Link></li>
          ))}
        </ul>
        <button className="eyebrow md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">Menu</button>

        <Link href="/" aria-label="Toronto Tech Week home" className="flex items-center gap-2.5">
          <Mark />
          <span className="hidden text-[1.15rem] font-medium tracking-[-0.035em] sm:inline">Toronto Tech Week</span>
        </Link>

        <ul className="hidden items-center justify-end gap-1 md:flex">
          {right.map((l) => (
            <li key={l.label}><Link href={l.href} className="rounded-full px-4 py-2 text-[0.95rem] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]">{l.label}</Link></li>
          ))}
          <li><a href={site.links.applyToHost} className="btn btn-volt ml-2 h-10 px-4 text-[0.7rem]">Apply to Host</a></li>
        </ul>
        <div className="flex justify-end md:hidden">
          <a href={site.links.applyToHost} className="btn btn-volt h-10 px-4 text-[0.65rem]">Host</a>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)] p-6" style={{ animation: "rise 500ms var(--ease-out-expo) both" }}>
          <div className="flex items-center justify-between">
            <Mark />
            <button className="eyebrow" onClick={() => setOpen(false)}>Close</button>
          </div>
          <ul className="mt-16 space-y-2">
            {[{ label: "Home", href: "/" }, ...left, ...right].map((l) => (
              <li key={l.label} className="border-b-[1.5px] rule">
                <Link onClick={() => setOpen(false)} href={l.href} className="display block py-4 text-5xl">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span className={`grid place-items-center rounded-full bg-[linear-gradient(135deg,#1422b0,#2e46ff_50%,#8a9bff)] text-white shadow-[0_0_0_1.5px_rgba(238,241,255,0.5)_inset,0_6px_24px_-6px_rgba(46,70,255,0.9)] ${className}`}>
      <span className="font-mono text-[0.7rem] font-bold tracking-tight">TTW</span>
    </span>
  );
}
