import fs from "node:fs";
import path from "node:path";

export type LogoMap = Record<string, string>;

/** Build-time read of public/logos/manifest.json (slug -> filename). */
export function getLogoMap(): LogoMap {
  try {
    const p = path.join(process.cwd(), "public", "logos", "manifest.json");
    if (!fs.existsSync(p)) return {};
    const raw = JSON.parse(fs.readFileSync(p, "utf8")) as LogoMap;
    const out: LogoMap = {};
    const skip = new Set(["rbc", "td", "intercom", "ycombinator", "databricks"]); // icon-only marks read poorly at tile size
    for (const [slug, file] of Object.entries(raw)) {
      if (skip.has(slug)) continue;
      if (fs.existsSync(path.join(process.cwd(), "public", "logos", file))) out[slug] = `/logos/${file}`;
    }
    // host-table slugs that differ from logo filenames
    const alias: Record<string, string> = {
      "float-financial": "float", mars: "mars-discovery-district", "mars-investment-accelerator-fund": "mars-discovery-district",
      rbcx: "rbc", "shopify-ventures": "shopify", "ada-cx": "ada", "inovia-capital": "inovia", "portage-ventures": "portage",
      "google-for-startups": "google-for-startups",
    };
    for (const [a, b] of Object.entries(alias)) if (!out[a] && out[b]) out[a] = out[b];
    return out;
  } catch {
    return {};
  }
}
