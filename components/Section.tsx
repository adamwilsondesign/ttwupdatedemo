export function Section({ tone, id, children, className = "", innerClass = "" }: {
  tone: "dark" | "light"; id?: string; children: React.ReactNode; className?: string; innerClass?: string;
}) {
  return (
    <section data-tone={tone} id={id} className={`relative scroll-mt-20 ${className}`}>
      <div className={`frame mx-auto max-w-[1440px] border-t-[1.5px] rule-strong ${innerClass}`}>
        <span className="cross -left-[9px] -top-[9px]" />
        <span className="cross -right-[9px] -top-[9px]" />
        {children}
      </div>
    </section>
  );
}

export function SectionHead({ index, eyebrow, title, lede, action }: {
  index: string; eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 px-5 pt-20 pb-12 md:px-10 md:pt-28 lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="reveal">
        <p className="eyebrow mb-6 flex items-center gap-3 text-[var(--muted)]">
          <span className="text-[var(--accent)]">{index}</span>
          <span className="h-[1.5px] w-10 bg-[var(--fg)]" />
          {eyebrow}
        </p>
        <h2 className="h-section max-w-[16ch]">{title}</h2>
        {lede && <p className="lede mt-6 max-w-[56ch]">{lede}</p>}
      </div>
      {action && <div className="reveal">{action}</div>}
    </div>
  );
}
