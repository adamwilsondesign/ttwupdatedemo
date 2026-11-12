"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Watches every [data-tone] section. Whichever one crosses the middle of the
   viewport sets html[data-tone], and the registered CSS colour properties
   crossfade the whole page between dark and light. Also drives .reveal. */
export function PageFx() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    const toneIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) root.dataset.tone = (e.target as HTMLElement).dataset.tone || "dark";
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => toneIO.observe(s));

    const revealIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } }),
      { rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => revealIO.observe(el));
    return () => { toneIO.disconnect(); revealIO.disconnect(); };
  }, [pathname]);
  return null;
}
