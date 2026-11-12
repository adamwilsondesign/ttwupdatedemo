"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { categories, type Perk, type Category } from "@/data/perks";
import { Logo } from "@/components/Logo";
import { Arrow } from "@/components/hero/Hero";
import type { LogoMap } from "@/lib/logos";
import { track } from "@/lib/analytics";
import { AuthModal, type Member } from "./AuthModal";
import { RedeemModal } from "./RedeemModal";

const STORE = "ttw-perks-member";
type Audience = "All" | "Hosts" | "Attendees";
type Sort = "value" | "az" | "new";

export const money = (n: number) => n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
export const valueLabel = (p: Perk) => (p.valueType === "upTo" ? `Up to ${money(p.value)}` : `${money(p.value)} value`);
const catMeta = (c: Category) => categories.find((x) => x.name === c)!;

export function CategoryTag({ c, small }: { c: Category; small?: boolean }) {
  const m = catMeta(c);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] font-mono uppercase tracking-[0.1em] ${small ? "px-2 py-0.5 text-[0.6rem]" : "px-2.5 py-1 text-[0.65rem]"}`}
      // solid tint + fixed ink text: legible on paper, night and the volt hover state
      style={{ borderColor: m.hue, background: `color-mix(in srgb, ${m.hue} 16%, #ffffff)`, color: "#04050d" }}
    >
      <span style={{ color: `color-mix(in srgb, ${m.hue} 80%, #04050d)` }}>{m.glyph}</span>
      {c}
    </span>
  );
}

export function PerksClient({ perks, logos }: { perks: Perk[]; logos: LogoMap }) {
  const [member, setMember] = useState<Member | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [redeem, setRedeem] = useState<Perk | null>(null);
  const [q, setQ] = useState("");
  const [aud, setAud] = useState<Audience>("All");
  const [cat, setCat] = useState<Category | "All">("All");
  const [sort, setSort] = useState<Sort>("value");
  const pending = useRef<Perk | null>(null);

  useEffect(() => {
    try { const raw = localStorage.getItem(STORE); if (raw) setMember(JSON.parse(raw)); } catch {}
    track("page_view", { page: "perks" });
  }, []);

  // derived automatically from Airtable records — no manual updates
  const totalValue = perks.reduce((s, p) => s + p.value, 0);
  const partnerCount = new Set(perks.map((p) => p.partner)).size;
  const featured = perks.filter((p) => p.featured).slice(0, 4);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let r = perks.filter((p) =>
      (aud === "All" || p.audience.includes(aud)) &&
      (cat === "All" || p.category === cat) &&
      (!term || `${p.partner} ${p.title} ${p.description} ${p.category}`.toLowerCase().includes(term))
    );
    r = [...r].sort((a, b) => sort === "value" ? b.value - a.value : sort === "az" ? a.partner.localeCompare(b.partner) : b.addedISO.localeCompare(a.addedISO));
    return r;
  }, [perks, q, aud, cat, sort]);

  const openPerk = (p: Perk) => {
    track("perk_click", { perk_id: p.id, partner: p.partner, unlocked: !!member });
    if (!member) { pending.current = p; setAuthOpen(true); track("signup_started", { source: "perks", trigger: p.id }); return; }
    setRedeem(p);
  };

  const onAuthed = (m: Member) => {
    setMember(m);
    try { localStorage.setItem(STORE, JSON.stringify(m)); } catch {}
    setAuthOpen(false);
    if (pending.current) { const p = pending.current; pending.current = null; setTimeout(() => setRedeem(p), 450); }
  };

  return (
    <>
      {/* ── HERO ── */}
      <section data-tone="dark" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grad-plasma opacity-90" />
        <div className="pointer-events-none absolute inset-0 grain" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,#05060f)]" />
        <div className="frame relative mx-auto max-w-[1440px]">
          <div className="px-5 pt-36 pb-16 md:px-10 md:pt-44 md:pb-20">
          <span className="cross -left-[9px] top-[88px]" />
          <span className="cross -right-[9px] top-[88px]" />
          <p className="eyebrow mb-6 text-volt-100">Partner Perks · TTW 2027</p>
          {member ? (
            <h1 className="display max-w-[14ch] text-[clamp(3rem,8vw,8rem)] text-white" style={{ animation: "rise 900ms var(--ease-out-expo) both" }}>
              Welcome, {member.name.split(" ")[0]}. <span className="text-volt-100">All {perks.length} perks unlocked.</span>
            </h1>
          ) : (
            <h1 className="display max-w-[17ch] text-[clamp(3rem,8vw,8rem)] text-white">Perks for the people building TTW.</h1>
          )}
          <p className="mt-8 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-volt-100">
            Exclusive offers from TTW partners for event hosts and attendees: venues, catering, cloud credits, travel and the tools to run a great event.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {member ? (
              <>
                <a href="#all" className="btn bg-white text-volt-700 hover:bg-volt-100">Browse your perks <Arrow /></a>
                <button className="btn border-[1.5px] border-white/60 text-white hover:bg-white hover:text-volt-700"
                  onClick={() => { localStorage.removeItem(STORE); setMember(null); }}>Sign out</button>
              </>
            ) : (
              <>
                <button className="btn btn-signal" onClick={() => { setAuthOpen(true); track("signup_started", { source: "perks", trigger: "hero" }); }}>
                  Unlock all perks <Arrow />
                </button>
                <span className="eyebrow text-volt-100">Free · 30 seconds · Google, Microsoft or work email</span>
              </>
            )}
          </div>
          </div>

          {/* stats row — its bottom edge is the carousel's top rule */}
          <dl className="grid grid-cols-3 border-t-[1.5px] border-white/40 text-white">
            {[
              [String(perks.length), "Active offers"],
              [`${money(totalValue)}+`, "Combined value"],
              [String(partnerCount), "Partners"],
            ].map(([v, l], i) => (
              <div key={l} className={`px-5 py-7 md:px-10 ${i ? "border-l-[1.5px] border-white/40" : ""}`}>
                <dt className="eyebrow text-volt-100">{l}</dt>
                <dd className="display mt-3 text-[clamp(1.8rem,4.6vw,4.4rem)]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── PARTNER CAROUSEL ── */}
      <section data-tone="dark" className="relative">
        <div className="frame mx-auto max-w-[1440px] border-t-[1.5px] rule-strong">
          <p className="eyebrow px-5 pt-8 text-[var(--muted)] md:px-10">Offers from</p>
          <div className="marquee-wrap mask-x overflow-hidden py-8">
            <div className="marquee items-center" style={{ ["--dur" as string]: "45s" }}>
              {[...perks, ...perks].map((p, i) => (
                <div key={i} className="grid h-14 w-[200px] shrink-0 place-items-center px-6">
                  <Logo org={{ name: p.partner, slug: p.partnerSlug }} src={logos[p.partnerSlug]} className="h-8" wordmarkClass="text-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section data-tone="light" className="relative">
        <div className="frame mx-auto max-w-[1440px] border-t-[1.5px] rule-strong">
          <span className="cross -left-[9px] -top-[9px]" />
          <span className="cross -right-[9px] -top-[9px]" />
          <div className="flex items-end justify-between px-5 pt-20 pb-10 md:px-10">
            <div>
              <p className="eyebrow mb-5 text-[var(--muted)]"><span className="text-[var(--accent)]">01</span> — Featured perks</p>
              <h2 className="h-section">Big-ticket offers.</h2>
            </div>
          </div>
          <div className="grid border-t-[1.5px] rule-strong md:grid-cols-2">
            {featured.map((p, i) => (
              <button key={p.id} onClick={() => openPerk(p)}
                className={`group relative flex min-h-[300px] flex-col justify-between overflow-hidden p-6 text-left md:p-10 ${i % 2 ? "md:border-l-[1.5px]" : ""} ${i > 0 ? "border-t-[1.5px]" : ""} ${i === 1 ? "md:border-t-0" : ""} rule-strong`}>
                <div className="absolute inset-0 translate-y-full grad-volt transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="h-10 w-40 group-hover:[&_img]:![filter:brightness(0)_invert(1)] group-hover:text-white">
                    <Logo org={{ name: p.partner, slug: p.partnerSlug }} src={logos[p.partnerSlug]} className="!mx-0 h-10" wordmarkClass="text-2xl text-left" />
                  </div>
                  <CategoryTag c={p.category} />
                </div>
                <div className="relative group-hover:text-white">
                  <p className="eyebrow mb-3 text-[var(--accent)] group-hover:text-volt-100">{valueLabel(p)}</p>
                  <h3 className="text-[clamp(1.8rem,3.2vw,3rem)] font-medium leading-[1] tracking-[-0.035em]">{p.title}</h3>
                  <p className="mt-4 max-w-[46ch] text-[var(--muted)] group-hover:text-volt-100">{p.description}</p>
                  <span className="eyebrow mt-6 inline-flex items-center gap-2">{member ? "Redeem" : "🔒 Sign in to unlock"} <Arrow /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL PERKS ── */}
      <section data-tone="light" id="all" className="relative scroll-mt-16">
        <div className="frame mx-auto max-w-[1440px] border-t-[1.5px] rule-strong">
          <span className="cross -left-[9px] -top-[9px]" />
          <span className="cross -right-[9px] -top-[9px]" />
          <div className="px-5 pt-20 pb-8 md:px-10">
            <p className="eyebrow mb-5 text-[var(--muted)]"><span className="text-[var(--accent)]">02</span> — All perks</p>
            <h2 className="h-section">Find your perk.</h2>
          </div>

          {/* filter bar — floats like the nav: same width, same pill shape */}
          <div className="sticky top-[88px] z-30 px-3 py-3 md:top-[92px] md:px-5">
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 rounded-full border-[1.5px] rule bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] px-2 shadow-[0_10px_40px_-20px_rgba(4,5,13,0.35)] backdrop-blur-xl">
              <div className="flex h-12 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
                {(["All", "Hosts", "Attendees"] as Audience[]).map((a) => (
                  <button key={a} onClick={() => setAud(a)} className={`eyebrow h-11 shrink-0 whitespace-nowrap rounded-full px-3 text-[0.62rem] transition-colors sm:px-5 sm:text-xs ${aud === a ? "bg-[var(--fg)] text-[var(--bg)]" : "hover:bg-[color-mix(in_srgb,var(--fg)_8%,transparent)]"}`}>
                    {a === "All" ? "Everyone" : `For ${a}`}
                  </button>
                ))}
              </div>
              <span className="eyebrow hidden text-[var(--muted)] md:inline">{list.length} {list.length === 1 ? "perk" : "perks"}</span>
              <label className="flex h-11 shrink-0 items-center gap-2 rounded-full px-3 hover:bg-[color-mix(in_srgb,var(--fg)_8%,transparent)] sm:px-5">
                <span className="eyebrow hidden text-[var(--muted)] sm:inline">Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="eyebrow bg-transparent text-[0.62rem] outline-none sm:text-xs">
                  <option value="value">Highest value</option>
                  <option value="az">A – Z</option>
                  <option value="new">Newest</option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-10 lg:grid-cols-3">
            {list.map((p) => <PerkCard key={p.id} p={p} logo={logos[p.partnerSlug]} unlocked={!!member} onOpen={() => openPerk(p)} />)}
            {!list.length && (
              <div className="col-span-full rounded-2xl border-[1.5px] border-dashed rule p-16 text-center">
                <p className="text-2xl font-medium tracking-tight">No perks match that.</p>
                <button className="eyebrow mt-4 text-[var(--accent)]" onClick={() => { setQ(""); setCat("All"); setAud("All"); }}>Clear filters</button>
              </div>
            )}
          </div>

          <div className="grid border-t-[1.5px] rule md:grid-cols-2">
            <div className="p-5 md:p-10">
              <p className="eyebrow mb-3 text-[var(--muted)]">How we calculate combined value</p>
              <p className="max-w-[60ch] text-[var(--muted)]">Partners submit an estimated CAD value with each offer. Guaranteed benefits count at face value. Offers with a maximum potential benefit are counted at their stated cap and labelled &ldquo;Up to&rdquo;. Offer counts and totals update automatically as approved offers are added in Airtable.</p>
            </div>
            <div className="border-t-[1.5px] rule p-5 md:border-l-[1.5px] md:border-t-0 md:p-10">
              <p className="eyebrow mb-3 text-[var(--muted)]">Want to offer a perk?</p>
              <p className="max-w-[60ch] text-[var(--muted)]">Partners can submit an offer through our perk submission form. The TTW team reviews every offer before it goes live.</p>
              <a href="mailto:partners@torontotechweek.com" className="btn btn-ghost mt-6">Submit a perk</a>
            </div>
          </div>
        </div>
      </section>

      <AuthModal open={authOpen} onClose={() => { setAuthOpen(false); pending.current = null; }} onDone={onAuthed} />
      <RedeemModal perk={redeem} logo={redeem ? logos[redeem.partnerSlug] : undefined} onClose={() => setRedeem(null)} />
    </>
  );
}

function PerkCard({ p, logo, unlocked, onOpen }: { p: Perk; logo?: string; unlocked: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { track("perk_impression", { perk_id: p.id, partner: p.partner }); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [p.id, p.partner]);

  return (
    <article ref={ref} className="group relative flex flex-col overflow-hidden rounded-2xl border-[1.5px] rule-strong bg-[var(--surface)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#2e46ff]" style={{ animation: "rise 600ms var(--ease-out-expo) both" }}>
      <div className="flex items-center justify-between gap-3 border-b-[1.5px] rule p-5">
        <div className="h-8 w-32"><Logo org={{ name: p.partner, slug: p.partnerSlug }} src={logo} className="!mx-0 h-7" wordmarkClass="text-lg text-left" /></div>
        <CategoryTag c={p.category} small />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[0.65rem] text-[var(--accent)]">{valueLabel(p)}</p>
        <h3 className="mt-2 text-[1.45rem] font-medium leading-[1.08] tracking-[-0.03em]">{p.title}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-[var(--muted)]">{p.description}</p>
        <div className="mt-4 flex gap-2">
          {p.audience.map((a) => <span key={a} className="eyebrow rounded-full bg-[color-mix(in_srgb,var(--fg)_7%,transparent)] px-2.5 py-1 text-[0.6rem]">For {a}</span>)}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t-[1.5px] rule p-4 pl-5">
        <span className={`font-mono text-sm tracking-[0.12em] transition-[filter] duration-700 ${unlocked ? "" : "select-none blur-[5px]"}`} aria-hidden={!unlocked}>
          {unlocked ? p.code : "TTW-XXXX-XX"}
        </span>
        <button onClick={onOpen} className={`btn h-10 px-4 text-[0.65rem] ${unlocked ? "btn-volt" : "btn-ghost"}`}>
          {unlocked ? <>Redeem <Arrow /></> : <>🔒 Unlock</>}
        </button>
      </div>
    </article>
  );
}
