export function PageHero({ eyebrow, title, lede, children }: { eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section data-tone="dark" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grad-horizon" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(70%_70%_at_30%_40%,#000,transparent)]" />
      <div className="frame relative mx-auto max-w-[1440px] px-5 pt-36 pb-20 md:px-10 md:pt-48 md:pb-28">
        <span className="cross -left-[9px] top-[88px]" />
        <span className="cross -right-[9px] top-[88px]" />
        <p className="eyebrow mb-6 text-[var(--muted)]">{eyebrow}</p>
        <h1 className="display max-w-[15ch] text-[clamp(3rem,8vw,8rem)]" style={{ animation: "rise 1s var(--ease-out-expo) both" }}>{title}</h1>
        {lede && <p className="lede mt-8 max-w-[56ch]">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
