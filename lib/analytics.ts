// Thin analytics layer. Events are pushed to window.dataLayer (GTM / GA4 / PostHog
// can all consume this), so the Partner Perks reporting asks map 1:1:
//   page traffic        -> page_view (+ GA4 users)
//   account creation    -> account_created { source }  (source = "perks" | "home" | ...)
//   offer engagement    -> perk_impression / perk_click / perk_redeem { perk_id, partner }
//   conversion          -> signup_started -> account_created -> perk_redeem funnel
//   partner reporting   -> group all perk_* events by `partner`
type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>> }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...props, ts: Date.now() });
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, props);
}
