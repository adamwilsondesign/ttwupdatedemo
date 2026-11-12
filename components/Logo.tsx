import type { Org } from "@/data/sponsors";

/* Renders a partner logo flattened to one colour (follows section tone).
   Falls back to a consistent typographic wordmark when no file exists,
   which is also how we standardise messy partner-submitted logos. */
export function Logo({ org, src, className = "h-8", wordmarkClass = "" }: {
  org: Pick<Org, "name" | "slug" | "tba">; src?: string; className?: string; wordmarkClass?: string;
}) {
  if (org.tba) {
    return (
      <div className={`flex items-center justify-center rounded-md border-[1.5px] border-dashed rule px-2 ${className}`} title="Presenting partner to be announced">
        <span className="eyebrow whitespace-nowrap text-[0.55rem] text-[var(--muted)]">TBA</span>
      </div>
    );
  }
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={org.name} loading="lazy" className={`logo-img mx-auto w-auto max-w-full object-contain ${className}`} />;
  }
  return (
    <span className={`block text-center font-medium tracking-[-0.03em] ${wordmarkClass.includes("line-clamp") ? "" : "truncate"} ${wordmarkClass}`} title={org.name}>
      {org.name}
    </span>
  );
}
