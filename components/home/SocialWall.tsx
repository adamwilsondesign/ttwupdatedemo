import { posts, type Post } from "@/data/social";
import { Section, SectionHead } from "@/components/Section";
import { site } from "@/lib/site.config";

const NET = {
  linkedin: { label: "LinkedIn", icon: "in" },
  x: { label: "X", icon: "𝕏" },
  instagram: { label: "Instagram", icon: "◎" },
};

function PostImage({ kind }: { kind: NonNullable<Post["image"]> }) {
  const art: Record<string, React.ReactNode> = {
    skyline: (
      <svg viewBox="0 0 300 160" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
        <rect width="300" height="160" fill="url(#pg)" />
        <path d="M0 160V110h20V90h18v20h14V70h22v40h10V60h16v50h18V96h20v14h12V40h3V20h2v20h3v70h16V80h24v30h18V94h20v66Z" fill="#05060f" opacity=".85" />
      </svg>
    ),
    crowd: (
      <svg viewBox="0 0 300 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width="300" height="160" fill="url(#pg)" />
        {Array.from({ length: 22 }).map((_, i) => (
          <g key={i} fill="#05060f" opacity={0.55 + (i % 3) * 0.15}>
            <circle cx={(i * 37) % 300} cy={110 + (i % 4) * 8} r={10} />
            <rect x={(i * 37) % 300 - 14} y={122 + (i % 4) * 8} width={28} height={50} rx={12} />
          </g>
        ))}
      </svg>
    ),
    stage: (
      <svg viewBox="0 0 300 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width="300" height="160" fill="#05060f" />
        <path d="M150 0 60 160h180Z" fill="url(#pg)" opacity=".7" />
        <rect x="40" y="40" width="220" height="70" fill="none" stroke="#b7c3ff" strokeWidth="2" />
        <text x="150" y="85" textAnchor="middle" fill="#eef1ff" fontSize="30" fontFamily="volksans" letterSpacing="-1.5">Homecoming</text>
      </svg>
    ),
    streetcar: (
      <svg viewBox="0 0 300 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width="300" height="160" fill="url(#pg)" />
        <rect x="30" y="70" width="240" height="50" rx="14" fill="#05060f" stroke="#eef1ff" strokeWidth="2" />
        {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={46 + i * 27} y={80} width={20} height={18} rx={2} fill="#2e46ff" />)}
        <line x1="0" y1="135" x2="300" y2="135" stroke="#eef1ff" strokeWidth="2" />
      </svg>
    ),
    badge: (
      <svg viewBox="0 0 300 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width="300" height="160" fill="#eef1ff" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${30 + i * 64} ${30 + (i % 2) * 14}) rotate(${(i - 1.5) * 6})`}>
            <rect width="54" height="80" rx="6" fill="url(#pg)" />
            <text x="27" y="48" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="decimaMono">TTW</text>
          </g>
        ))}
      </svg>
    ),
  };
  return <div className="mt-4 aspect-[15/8] overflow-hidden rounded-xl border-[1.5px] rule">{art[kind]}</div>;
}

function Card({ p }: { p: Post }) {
  const initials = p.author.split(/[ .]/).map((s) => s[0]).slice(0, 2).join("").toUpperCase();
  return (
    <article className="mb-4 rounded-2xl border-[1.5px] rule-strong bg-[var(--surface)] p-5 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#2e46ff]">
      <header className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#1422b0,#5c70ff)] font-mono text-xs text-white">{initials}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium leading-tight">{p.author}</p>
          <p className="truncate text-sm text-[var(--muted)]">{p.role ?? `@${p.handle}`}</p>
        </div>
        <span className="grid h-7 w-7 place-items-center rounded-full border-[1.5px] rule-strong font-mono text-[0.7rem] font-bold" title={NET[p.network].label}>{NET[p.network].icon}</span>
      </header>
      <p className="mt-4 text-[0.98rem] leading-relaxed">{p.body}</p>
      {p.image && <PostImage kind={p.image} />}
      <footer className="eyebrow mt-4 flex justify-between text-[0.65rem] text-[var(--muted)]">
        <span>♥ {p.likes.toLocaleString("en-CA")}</span>
        <span>{p.date}</span>
      </footer>
    </article>
  );
}

export function SocialWall({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const cols = [0, 1, 2, 3].map((c) => posts.filter((_, i) => i % 4 === c));
  return (
    <Section tone={tone} id="community">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#070c45" /><stop offset=".5" stopColor="#2e46ff" /><stop offset="1" stopColor="#b7c3ff" />
          </linearGradient>
        </defs>
      </svg>
      <SectionHead
        index="08"
        eyebrow="Community"
        title="TTW 2026, in your words."
        action={
          <div className="flex flex-wrap gap-3">
            <a className="btn btn-ghost" href={site.social.linkedin}>LinkedIn</a>
            <a className="btn btn-ghost" href={site.social.instagram}>Instagram</a>
            <a className="btn btn-ghost" href={site.social.x}>X</a>
          </div>
        }
      />
      {/* mobile: horizontal carousel of every post */}
      <div className="marquee-wrap mask-x overflow-hidden border-t-[1.5px] rule-strong py-6 sm:hidden">
        <div className="marquee items-start gap-4" style={{ ["--dur" as string]: "90s" }}>
          {[...posts, ...posts].map((p, i) => <div key={i} className="w-[290px] shrink-0"><Card p={p} /></div>)}
        </div>
      </div>
      <div className="marquee-wrap mask-y relative hidden h-[900px] overflow-hidden border-t-[1.5px] rule-strong px-4 sm:block md:px-10">
        <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cols.map((col, ci) => (
            <div key={ci} className={`overflow-hidden ${ci > 1 ? "hidden lg:block" : ""}`}>
              <div className="pt-4" style={{ animation: `${ci % 2 ? "scroll-down" : "scroll-up"} ${38 + ci * 6}s linear infinite` }} data-anim>
                {[...col, ...col].map((p, i) => <Card key={`${p.id}-${i}`} p={p} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
