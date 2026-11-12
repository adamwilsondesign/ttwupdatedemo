// Shape mirrors the proposed Airtable "Partner Perks" table, fed by the partner
// submission form. Only records with status === "Approved" render on the site, so
// new submissions never go live before the TTW team reviews them.
//
// Value methodology (shown on page): partners submit an estimated CAD value.
// `valueType: "fixed"` = guaranteed benefit counted at face value.
// `valueType: "upTo"`  = maximum potential value, counted at its stated cap and
// labelled "up to" on cards so the combined figure stays honest.
// DEMO DATA: partners and offers are illustrative.

export type Category =
  | "Venues"
  | "Catering"
  | "Production"
  | "Cloud"
  | "Finance"
  | "Software & Tools"
  | "Hotels & Travel"
  | "Workspaces";

export type Audience = "Hosts" | "Attendees";

export type Perk = {
  id: string;
  partner: string;
  partnerSlug: string;
  title: string;
  description: string;
  category: Category;
  audience: Audience[];
  value: number;
  valueType: "fixed" | "upTo";
  featured: boolean;
  status: "Approved" | "Pending Review" | "Rejected";
  code: string;
  redeemUrl: string;
  terms: string;
  addedISO: string;
};

export const categories: { name: Category; glyph: string; hue: string }[] = [
  { name: "Venues", glyph: "◧", hue: "#2e46ff" },
  { name: "Catering", glyph: "◍", hue: "#e5484d" },
  { name: "Production", glyph: "◩", hue: "#f5a524" },
  { name: "Cloud", glyph: "◌", hue: "#06b6d4" },
  { name: "Finance", glyph: "◆", hue: "#16a34a" },
  { name: "Software & Tools", glyph: "▣", hue: "#8b5cf6" },
  { name: "Hotels & Travel", glyph: "◭", hue: "#ec4899" },
  { name: "Workspaces", glyph: "▤", hue: "#64748b" },
];

export const perks: Perk[] = [
  { id: "pk01", partner: "Float", partnerSlug: "float", title: "$500 card credit + 2% cash back", description: "Spend smarter on event costs with Canada's corporate card. Credit applied after first $5k in spend.", category: "Finance", audience: ["Hosts"], value: 500, valueType: "fixed", featured: true, status: "Approved", code: "TTW27FLOAT", redeemUrl: "https://floatfinancial.com", terms: "New Float customers only. Credit issued within 30 days.", addedISO: "2026-11-02" },
  { id: "pk02", partner: "Amazon Web Services", partnerSlug: "aws", title: "Up to $10,000 in AWS Activate credits", description: "Cloud credits, technical support and training for early-stage startups building during TTW.", category: "Cloud", audience: ["Hosts", "Attendees"], value: 10000, valueType: "upTo", featured: true, status: "Approved", code: "TTW-ACTIVATE-27", redeemUrl: "https://aws.amazon.com/activate", terms: "Eligible startups, subject to AWS Activate review.", addedISO: "2026-10-20" },
  { id: "pk03", partner: "Shopify", partnerSlug: "shopify", title: "3 months of Shopify for $1/month", description: "Launch your merch store or event pop-up shop with a full Shopify plan.", category: "Software & Tools", audience: ["Hosts", "Attendees"], value: 315, valueType: "fixed", featured: true, status: "Approved", code: "TTWSHOP27", redeemUrl: "https://www.shopify.com", terms: "New stores on Basic or Shopify plans.", addedISO: "2026-10-28" },
  { id: "pk04", partner: "Fairmont Royal York", partnerSlug: "fairmont", title: "25% off rooms + event spaces", description: "Book rooms for out-of-town speakers or a ballroom for your flagship event, steps from Union Station.", category: "Hotels & Travel", audience: ["Hosts", "Attendees"], value: 2500, valueType: "upTo", featured: true, status: "Approved", code: "TTWROYAL", redeemUrl: "https://www.fairmont.com/royal-york-toronto", terms: "Stays May 28 – June 7, 2027. Subject to availability.", addedISO: "2026-11-05" },
  { id: "pk05", partner: "Porter Airlines", partnerSlug: "porter-airlines", title: "15% off flights to Toronto", description: "Fly into Billy Bishop or Pearson for TTW week from 30+ destinations across North America.", category: "Hotels & Travel", audience: ["Attendees"], value: 300, valueType: "upTo", featured: false, status: "Approved", code: "PORTERTTW27", redeemUrl: "https://www.flyporter.com", terms: "Base fare only. Travel May 27 – June 8, 2027.", addedISO: "2026-11-01" },
  { id: "pk06", partner: "Luma", partnerSlug: "luma", title: "Luma Plus free for 6 months", description: "Ticketing, check-in, and invite pages built for community events. Zero platform fees on paid tickets.", category: "Software & Tools", audience: ["Hosts"], value: 354, valueType: "fixed", featured: true, status: "Approved", code: "TTW-LUMA-PLUS", redeemUrl: "https://lu.ma", terms: "New Luma Plus subscriptions.", addedISO: "2026-10-15" },
  { id: "pk07", partner: "Notion", partnerSlug: "notion", title: "6 months of Notion Plus + AI", description: "Plan run-of-show, speaker briefs and sponsor decks in one workspace.", category: "Software & Tools", audience: ["Hosts", "Attendees"], value: 1000, valueType: "upTo", featured: false, status: "Approved", code: "TTWNOTION", redeemUrl: "https://www.notion.so/startups", terms: "Teams under 100 seats.", addedISO: "2026-10-10" },
  { id: "pk08", partner: "WeWork", partnerSlug: "wework", title: "Free event space at 6 Toronto locations", description: "Host up to 120 guests in a WeWork event space — AV, wifi and furniture included.", category: "Venues", audience: ["Hosts"], value: 3000, valueType: "upTo", featured: true, status: "Approved", code: "WEWORKTTW", redeemUrl: "https://www.wework.com", terms: "One booking per host. Weekday evenings during TTW.", addedISO: "2026-11-08" },
  { id: "pk09", partner: "Spaces", partnerSlug: "spaces", title: "Free day passes all TTW week", description: "Drop-in desks between events at Spaces King West and Spaces Union Station.", category: "Workspaces", audience: ["Attendees"], value: 175, valueType: "fixed", featured: false, status: "Approved", code: "SPACESTTW", redeemUrl: "https://www.spacesworks.com", terms: "Up to 5 day passes per person.", addedISO: "2026-10-30" },
  { id: "pk10", partner: "Uber Eats", partnerSlug: "uber-eats", title: "$250 off catering orders", description: "Feed your attendees with Uber Eats for Business group orders from 2,000+ Toronto restaurants.", category: "Catering", audience: ["Hosts"], value: 250, valueType: "fixed", featured: false, status: "Approved", code: "EATSTTW250", redeemUrl: "https://www.ubereats.com", terms: "Orders over $750. One per host.", addedISO: "2026-11-03" },
  { id: "pk11", partner: "Ritual", partnerSlug: "ritual", title: "20% off group coffee & lunch", description: "Pre-order for your team or guests from Toronto's best independent cafés.", category: "Catering", audience: ["Hosts", "Attendees"], value: 200, valueType: "upTo", featured: false, status: "Approved", code: "RITUALTTW", redeemUrl: "https://ritual.co", terms: "Valid May 31 – June 4, 2027.", addedISO: "2026-10-22" },
  { id: "pk12", partner: "Google Cloud", partnerSlug: "google-cloud", title: "Up to $25,000 in cloud + AI credits", description: "Credits for Gemini, Vertex AI and Cloud Run for qualifying AI startups.", category: "Cloud", audience: ["Hosts", "Attendees"], value: 25000, valueType: "upTo", featured: false, status: "Approved", code: "GCP-TTW-27", redeemUrl: "https://cloud.google.com/startup", terms: "Pre-Series A startups, subject to approval.", addedISO: "2026-10-12" },
  { id: "pk13", partner: "Figma", partnerSlug: "figma", title: "1 year of Figma Professional", description: "Design your event branding, slides and signage with the whole team.", category: "Software & Tools", audience: ["Hosts", "Attendees"], value: 540, valueType: "fixed", featured: false, status: "Approved", code: "FIGMATTW", redeemUrl: "https://www.figma.com/startups", terms: "Up to 3 editors.", addedISO: "2026-10-18" },
  { id: "pk14", partner: "Category", partnerSlug: "category", title: "Free event brand & PR consult", description: "A 90-minute session with Category's comms team to sharpen your event story and media plan.", category: "Production", audience: ["Hosts"], value: 1500, valueType: "fixed", featured: false, status: "Approved", code: "CATEGORYTTW", redeemUrl: "https://category.agency", terms: "Limited to 20 hosts.", addedISO: "2026-11-06" },
  { id: "pk15", partner: "Lazer", partnerSlug: "lazer", title: "Product teardown for your startup", description: "A senior Lazer product + design team reviews your app and delivers a prioritized fix list.", category: "Production", audience: ["Hosts", "Attendees"], value: 5000, valueType: "fixed", featured: false, status: "Approved", code: "LAZERTTW", redeemUrl: "https://lazertechnologies.com", terms: "Limited to 10 startups. Application required.", addedISO: "2026-11-07" },
  { id: "pk16", partner: "Deel", partnerSlug: "deel", title: "3 months free of Deel HR", description: "Hire and pay talent you meet at TTW, in 150+ countries.", category: "Software & Tools", audience: ["Hosts", "Attendees"], value: 900, valueType: "upTo", featured: false, status: "Approved", code: "DEELTTW27", redeemUrl: "https://www.deel.com", terms: "New customers.", addedISO: "2026-10-25" },
  { id: "pk17", partner: "Eventbrite", partnerSlug: "eventbrite", title: "50% off ticketing fees", description: "Sell tickets to your TTW event with half the usual service fees.", category: "Software & Tools", audience: ["Hosts"], value: 750, valueType: "upTo", featured: false, status: "Approved", code: "EBTTW50", redeemUrl: "https://www.eventbrite.ca", terms: "Events dated May 31 – June 4, 2027.", addedISO: "2026-10-27" },
  { id: "pk18", partner: "Linear", partnerSlug: "linear", title: "6 months of Linear Business", description: "Plan the week like a product launch. Free for teams up to 25.", category: "Software & Tools", audience: ["Hosts"], value: 840, valueType: "upTo", featured: false, status: "Approved", code: "LINEARTTW", redeemUrl: "https://linear.app", terms: "New workspaces.", addedISO: "2026-11-04" },
  { id: "pk19", partner: "Miro", partnerSlug: "miro", title: "Miro Starter free for a year", description: "Run workshops, hackathon planning and post-event retros on infinite canvases.", category: "Software & Tools", audience: ["Hosts", "Attendees"], value: 1000, valueType: "upTo", featured: false, status: "Approved", code: "MIROTTW", redeemUrl: "https://miro.com/startups", terms: "Teams up to 30.", addedISO: "2026-10-14" },
  { id: "pk20", partner: "Ramp", partnerSlug: "ramp", title: "$250 bonus on your first card swipe", description: "Track event spend and receipts automatically.", category: "Finance", audience: ["Hosts"], value: 250, valueType: "fixed", featured: false, status: "Pending Review", code: "—", redeemUrl: "https://ramp.com", terms: "Awaiting TTW review — not displayed.", addedISO: "2026-11-11" },
];

export const approvedPerks = perks.filter((p) => p.status === "Approved");
