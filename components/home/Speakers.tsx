import { speakers } from "@/data/lineup";
import { Section, SectionHead } from "@/components/Section";
import { Arrow } from "@/components/hero/Hero";

/* Featured speakers. Portraits are generated duotone placeholders until
   headshots are supplied. */
function Portrait({ name, i }: { name: string; i: number }) {
  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2);
  const angle = (i * 47) % 360;
  return (
    <div className="relative aspect-[4/5] overflow-hidden" style={{ background: `linear-gradient(${angle}deg, #070c45, #2e46ff 55%, #b7c3ff)` }}>
      <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden>
        <circle cx="100" cy="98" r="44" fill="#05060f" opacity="0.55" />
        <path d="M18 250c0-58 37-92 82-92s82 34 82 92z" fill="#05060f" opacity="0.55" />
      </svg>
      <span className="display absolute left-4 top-3 text-[2.6rem] text-white/90">{initials}</span>
      <div className="grain absolute inset-0" />
    </div>
  );
}

export function Speakers({ tone = "light", index = "03" }: { tone?: "dark" | "light"; index?: string }) {
  return (
    <Section tone={tone} id="speakers">
      <SectionHead
        index={index}
        eyebrow="Featured speakers"
        title="The people building what's next."
        lede="Founders, operators, investors and researchers taking the stage across the week. More announced soon."
        action={<a href="#subscribe" className="btn btn-ghost">Get speaker drops <Arrow /></a>}
      />
      <div className="grid grid-cols-2 gap-[1.5px] border-y-[1.5px] rule-strong bg-[var(--line)] lg:grid-cols-4">
        {speakers.map((s, i) => (
          <article key={s.name} className="group reveal bg-[var(--bg)] p-3 md:p-4" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
            <div className="overflow-hidden rounded-xl border-[1.5px] rule-strong transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_0_#d4ff3a]">
              <Portrait name={s.name} i={i} />
            </div>
            <div className="px-1 pt-5 pb-3">
              <p className="text-[1.3rem] font-medium leading-tight tracking-[-0.03em] md:text-[1.55rem]">{s.name}</p>
              <p className="mt-1 text-[0.95rem] text-[var(--muted)]">{s.title}, {s.company}</p>
              <p className="eyebrow mt-4 text-[0.62rem] text-[var(--accent)]">“{s.topic}”</p>
            </div>
          </article>
        ))}
      </div>
      <div className="h-28 md:h-40" />
    </Section>
  );
}
