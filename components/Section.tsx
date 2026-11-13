/* Every section sits right of a "gutter" column that carries the track.
   Content and full-bleed elements start after the gutter so the rails
   are never covered. */
export function Section({ tone, id, children, className = "", gutter = true }: {
  tone: "dark" | "light"; id?: string; children: React.ReactNode; className?: string; gutter?: boolean;
}) {
  return (
    <section data-tone={tone} id={id} className={`relative scroll-mt-20 ${className}`}>
      <div className="frame mx-auto max-w-[1440px]">
        <div className={gutter ? "relative ml-[var(--gutter)] border-l-[1.5px] rule" : "relative"}>{children}</div>
      </div>
    </section>
  );
}

export function SectionHead({ index, eyebrow, title, lede, action }: {
  index: string; eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div className="grid gap-10 px-[var(--pad)] pt-28 pb-16 md:pt-40 md:pb-20 lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="reveal">
        <p className="eyebrow relative mb-8 flex items-center gap-3 text-[var(--muted)]">
          <span className="station-arm" data-station aria-hidden />
          <span className="text-[var(--accent)]">Stop {index}</span>
          <span className="h-[1.5px] w-10 bg-[var(--fg)]" />
          {eyebrow}
        </p>
        <h2 className="h-section max-w-[16ch]">{title}</h2>
        {lede && <p className="lede mt-8 max-w-[56ch]">{lede}</p>}
      </div>
      {action && <div className="reveal">{action}</div>}
    </div>
  );
}
