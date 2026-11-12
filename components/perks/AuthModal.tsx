"use client";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { track } from "@/lib/analytics";

export type Member = {
  name: string;
  email: string;
  method: "google" | "microsoft" | "email";
  participation: "Hosting" | "Attending" | "Both";
  topics: string[];
  role: string;
  newsletter: boolean;
};

// TODO: replace with the full topic list from the Event Host Application Form
const TOPICS = ["AI & Machine Learning", "Fintech", "Climate & Energy", "Health & Bio", "Developer Tools", "SaaS & B2B", "Commerce & Retail", "Hardware & Robotics", "Cybersecurity", "Web3", "Gaming & Media", "Mobility", "Proptech", "Edtech", "Founders & Fundraising", "Product & Design", "Growth & Marketing", "Careers & Talent", "Diversity & Inclusion", "Social Impact"];
const ROLES = ["Founder", "Investor", "Operator", "Engineer", "Designer", "Student", "Corporate / Enterprise", "Government / Nonprofit", "Other"];

type Step = "method" | "email" | "code" | "profile" | "done";

export function AuthModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: (m: Member) => void }) {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<Member["method"]>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [participation, setParticipation] = useState<Member["participation"] | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [newsletter, setNewsletter] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { if (open) { setStep("method"); setCode(["", "", "", "", "", ""]); } }, [open]);

  const sso = (m: "google" | "microsoft") => {
    setMethod(m);
    // Demo: in production this is an OAuth redirect (e.g. Clerk / Auth.js / Supabase Auth)
    setName(m === "google" ? "Alex Morgan" : "Sam Patel");
    setEmail(m === "google" ? "alex@startup.com" : "sam@company.ca");
    track("signin_method", { method: m, source: "perks" });
    setStep("profile");
  };

  const codeFull = code.every((c) => c);
  const profileOk = name.trim() && participation && role && topics.length > 0;

  const finish = () => {
    const m: Member = { name: name.trim(), email, method, participation: participation!, topics, role: role!, newsletter };
    track("account_created", { source: "perks", method, participation: m.participation, role: m.role, topics: topics.length, newsletter });
    // TODO: if newsletter → POST to beehiiv subscriptions API (server route) with m.email
    if (newsletter) track("newsletter_optin", { source: "perks_signup" });
    setStep("done");
    setTimeout(() => onDone(m), 1300);
  };

  const totalSteps = 3;
  const stepNo = step === "method" || step === "email" || step === "code" ? 1 : step === "profile" ? 2 : 3;

  return (
    <Modal open={open} onClose={onClose} label="Unlock partner perks">
      <div className="h-1.5 bg-[var(--line)]"><div className="h-full grad-volt transition-[width] duration-700" style={{ width: `${(stepNo / totalSteps) * 100}%` }} /></div>
      <div className="p-6 pt-10 sm:p-10">
        <p className="eyebrow text-[var(--muted)]">Step {stepNo} of {totalSteps}</p>

        {step === "method" && (
          <>
            <h2 className="mt-3 text-[2.2rem] font-medium leading-none tracking-[-0.04em]">Unlock every perk.</h2>
            <p className="mt-3 text-[var(--muted)]">Create a free TTW account to see codes and redeem offers.</p>
            <div className="mt-8 space-y-3">
              <button onClick={() => sso("google")} className="flex h-14 w-full items-center justify-center gap-3 rounded-full border-[1.5px] rule-strong font-medium transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]">
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.2l7.8 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.2 7-17.6z"/><path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.8-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.8l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.8 6.1C6.6 42.6 14.6 48 24 48z"/></svg>
                Continue with Google
              </button>
              <button onClick={() => sso("microsoft")} className="flex h-14 w-full items-center justify-center gap-3 rounded-full border-[1.5px] rule-strong font-medium transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]">
                <svg width="16" height="16" viewBox="0 0 21 21" aria-hidden><path fill="#f25022" d="M0 0h10v10H0z"/><path fill="#7fba00" d="M11 0h10v10H11z"/><path fill="#00a4ef" d="M0 11h10v10H0z"/><path fill="#ffb900" d="M11 11h10v10H11z"/></svg>
                Continue with Microsoft
              </button>
              <div className="eyebrow flex items-center gap-3 py-2 text-[var(--muted)]"><span className="h-[1.5px] flex-1 bg-[var(--line)]" />or<span className="h-[1.5px] flex-1 bg-[var(--line)]" /></div>
              <button onClick={() => { setMethod("email"); setStep("email"); }} className="btn btn-volt w-full">Use work email</button>
            </div>
          </>
        )}

        {step === "email" && (
          <form onSubmit={(e) => { e.preventDefault(); track("signin_method", { method: "email", source: "perks" }); setStep("code"); setTimeout(() => inputs.current[0]?.focus(), 50); }}>
            <h2 className="mt-3 text-[2.2rem] font-medium leading-none tracking-[-0.04em]">What&rsquo;s your work email?</h2>
            <p className="mt-3 text-[var(--muted)]">We&rsquo;ll send a 6-digit verification code. No password needed.</p>
            <input autoFocus type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
              className="mt-8 h-14 w-full rounded-full border-[1.5px] rule-strong bg-[var(--surface)] px-6 text-lg outline-none focus:border-volt" />
            <button className="btn btn-volt mt-4 w-full">Send code</button>
            <button type="button" onClick={() => setStep("method")} className="eyebrow mt-4 w-full text-center text-[var(--muted)]">← Back</button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={(e) => { e.preventDefault(); if (codeFull) { if (!name) setName(email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())); setStep("profile"); } }}>
            <h2 className="mt-3 text-[2.2rem] font-medium leading-none tracking-[-0.04em]">Check your inbox.</h2>
            <p className="mt-3 text-[var(--muted)]">Enter the code sent to <span className="text-[var(--fg)]">{email}</span>. <span className="opacity-70">(Demo: any 6 digits.)</span></p>
            <div className="mt-8 flex justify-between gap-2">
              {code.map((c, i) => (
                <input key={i} ref={(el) => { inputs.current[i] = el; }} inputMode="numeric" maxLength={1} value={c}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(-1);
                    const next = [...code]; next[i] = v; setCode(next);
                    if (v && i < 5) inputs.current[i + 1]?.focus();
                  }}
                  onKeyDown={(e) => { if (e.key === "Backspace" && !code[i] && i > 0) inputs.current[i - 1]?.focus(); }}
                  onPaste={(e) => { const d = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split(""); if (d.length) { e.preventDefault(); setCode([...d, ...Array(6 - d.length).fill("")]); } }}
                  className="h-16 w-full min-w-0 rounded-2xl border-[1.5px] rule-strong bg-[var(--surface)] text-center font-mono text-2xl outline-none focus:border-volt" />
              ))}
            </div>
            <button disabled={!codeFull} className="btn btn-volt mt-6 w-full disabled:opacity-40">Verify</button>
          </form>
        )}

        {step === "profile" && (
          <div>
            <h2 className="mt-3 text-[2.2rem] font-medium leading-none tracking-[-0.04em]">Tell us a little about you.</h2>
            <p className="mt-3 text-[var(--muted)]">Three quick questions help us tailor perks and programming.</p>

            <label className="mt-8 block">
              <span className="eyebrow text-[var(--muted)]">Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 h-12 w-full rounded-full border-[1.5px] rule-strong bg-[var(--surface)] px-5 outline-none focus:border-volt" />
            </label>

            <fieldset className="mt-7">
              <legend className="eyebrow mb-3"><span className="text-[var(--accent)]">01</span> How are you participating in TTW 2027?</legend>
              <div className="grid grid-cols-3 gap-2">
                {(["Hosting", "Attending", "Both"] as const).map((p) => (
                  <button key={p} type="button" onClick={() => setParticipation(p)}
                    className={`h-12 rounded-full border-[1.5px] font-medium transition-colors ${participation === p ? "border-volt bg-volt text-white" : "rule-strong hover:border-volt"}`}>{p}</button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="eyebrow mb-3"><span className="text-[var(--accent)]">02</span> Which topics interest you? <span className="text-[var(--muted)]">({topics.length} selected)</span></legend>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => {
                  const on = topics.includes(t);
                  return (
                    <button key={t} type="button" onClick={() => setTopics(on ? topics.filter((x) => x !== t) : [...topics, t])}
                      className={`rounded-full border-[1.5px] px-3 py-1.5 text-sm transition-colors ${on ? "border-volt bg-volt text-white" : "rule hover:border-volt"}`}>{on ? "✓ " : ""}{t}</button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="eyebrow mb-3"><span className="text-[var(--accent)]">03</span> Which best describes your role?</legend>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button key={r} type="button" onClick={() => setRole(r)}
                    className={`rounded-full border-[1.5px] px-3 py-1.5 text-sm transition-colors ${role === r ? "border-volt bg-volt text-white" : "rule hover:border-volt"}`}>{r}</button>
                ))}
              </div>
            </fieldset>

            <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-2xl border-[1.5px] rule p-4">
              <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} className="mt-1 h-4 w-4 accent-[#2e46ff]" />
              <span className="text-sm leading-relaxed">Send me TTW news, host deadlines and new perks. <span className="text-[var(--muted)]">Optional. Unsubscribe anytime.</span></span>
            </label>

            <button disabled={!profileOk} onClick={finish} className="btn btn-volt mt-6 w-full disabled:opacity-40">Unlock all perks</button>
          </div>
        )}

        {step === "done" && (
          <div className="py-10 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full grad-volt text-3xl text-white shadow-[0_0_60px_10px_rgba(46,70,255,0.5)]" style={{ animation: "rise 600ms var(--ease-out-expo) both" }}>✓</div>
            <h2 className="mt-6 text-[2.2rem] font-medium leading-none tracking-[-0.04em]">You&rsquo;re in, {name.split(" ")[0]}.</h2>
            <p className="mt-3 text-[var(--muted)]">Every perk is now unlocked.</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
