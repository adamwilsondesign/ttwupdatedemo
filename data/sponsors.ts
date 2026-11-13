export type Org = { name: string; slug: string; role?: string; url?: string; tba?: boolean; square?: boolean };

export const presenting: Org[] = [
  { name: "City of Toronto", slug: "city-of-toronto", url: "https://www.toronto.ca" },
  { name: "Shopify", slug: "shopify", url: "https://www.shopify.com" },
  { name: "Float", slug: "float", url: "https://floatfinancial.com" },
  { name: "Google", slug: "google", url: "https://about.google" },
];

// DEMO: Signature tier is illustrative until the 2027 lineup is confirmed.
export const signature: Org[] = [
  { name: "Wealthsimple", slug: "wealthsimple" },
  { name: "Cohere", slug: "cohere" },
  { name: "RBC", slug: "rbc", square: true },
  { name: "Clio", slug: "clio" },
];

export const supporting: Org[] = [
  { name: "Bell", slug: "bell" },
  { name: "Osler", slug: "osler" },
  { name: "Ada", slug: "ada" },
];

export const founding: Org[] = [
  { name: "Golden Ventures", slug: "golden-ventures", role: "Founding Partner" },
  { name: "Good Future", slug: "good-future", role: "Founding Partner" },
  { name: "BetaKit", slug: "betakit", role: "Founding Media Partner" },
  // Pending Mell's confirmation
  { name: "Sage Consulting", slug: "sage-consulting", role: "Founding Partner" },
];

export const inKind: Org[] = [
  { name: "Category", slug: "category", role: "Brand & Communications" },
  { name: "Lazer", slug: "lazer", role: "Product, Design & Engineering" },
  { name: "Growth Partners", slug: "growth-partners", role: "Fractional CFO" },
  { name: "Osler", slug: "osler", role: "Legal Counsel" },
];
