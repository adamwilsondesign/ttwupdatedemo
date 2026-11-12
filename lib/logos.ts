import fs from "node:fs";
import path from "node:path";

export type LogoMap = Record<string, string>;

const LOGO_DIR = path.join(process.cwd(), "public", "logos");

function readManifest(rel: string): LogoMap {
  const p = path.join(LOGO_DIR, rel);
  if (!fs.existsSync(p)) return {};
  try { return JSON.parse(fs.readFileSync(p, "utf8")) as LogoMap; } catch { return {}; }
}

/** Build-time logo lookup (slug -> public URL). Sources, in priority order:
 *  1. logos/manifest.json        — curated vector logos
 *  2. logos/hosts/manifest.json  — host logos from the live TTW site (Airtable uploads, trimmed)
 *  3. logos/hosts-extra/manifest.json — gap-fill for hosts with no logo on the live site */
export function getLogoMap(): LogoMap {
  const out: LogoMap = {};
  const skip = new Set(["rbc", "td", "intercom", "ycombinator", "databricks"]); // icon-only marks read poorly at tile size
  for (const rel of ["manifest.json", "hosts/manifest.json", "hosts-extra/manifest.json"]) {
    for (const [slug, file] of Object.entries(readManifest(rel))) {
      if (out[slug] || (rel === "manifest.json" && skip.has(slug))) continue;
      if (fs.existsSync(path.join(LOGO_DIR, file))) out[slug] = `/logos/${file}`;
    }
  }
  // host-table slugs that differ from logo filenames
  const alias: Record<string, string> = {
    "float-financial": "float", mars: "mars-discovery-district", "mars-investment-accelerator-fund": "mars-discovery-district",
    rbcx: "rbc", "shopify-ventures": "shopify", "ada-cx": "ada", "inovia-capital": "inovia", "portage-ventures": "portage",
  };
  for (const [a, b] of Object.entries(alias)) if (!out[a] && out[b]) out[a] = out[b];
  return out;
}
