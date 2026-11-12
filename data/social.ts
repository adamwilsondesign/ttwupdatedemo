// DEMO posts. In production these would be pulled from a curated
// "Social Wall" table (Airtable) or an embed provider (e.g. Juicer, Walls.io).
export type Post = {
  id: string;
  network: "linkedin" | "x" | "instagram";
  author: string;
  handle: string;
  role?: string;
  body: string;
  image?: "skyline" | "crowd" | "stage" | "streetcar" | "badge";
  likes: number;
  date: string;
};

export const posts: Post[] = [
  { id: "p1", network: "linkedin", author: "Priya Raman", handle: "priyaraman", role: "Founder, Lumen Health", body: "Five days, 600+ events, and I left with two design partners and a lead investor intro. Toronto Tech Week is the most underrated week in Canadian tech. Already blocking my calendar for 2027.", image: "crowd", likes: 1240, date: "Jun 5, 2026" },
  { id: "p2", network: "x", author: "Marcus Lee", handle: "marcusbuilds", body: "hot take: TTW is better than most conferences because there IS no conference. 30 events in 5 days, all hosted by people actually building. toronto showed up 🇨🇦", likes: 892, date: "Jun 4, 2026" },
  { id: "p3", network: "instagram", author: "torontotechweek", handle: "torontotechweek", body: "1,100 builders. One room. Homecoming 2026 at History 💙", image: "stage", likes: 4310, date: "Jun 3, 2026" },
  { id: "p4", network: "linkedin", author: "Sofia Martins", handle: "sofiamartins", role: "Partner, Northbound Ventures", body: "We hosted a founder breakfast expecting 40 people. 160 RSVPs, waitlist of 200. The appetite in this ecosystem is real. Thank you to everyone who came out at 7:30am(!)", likes: 671, date: "Jun 2, 2026" },
  { id: "p5", network: "x", author: "Dev Patel", handle: "devpatel_", body: "took the 504 between four events today. the streetcar is the official TTW shuttle and nobody can convince me otherwise", image: "streetcar", likes: 2105, date: "Jun 2, 2026" },
  { id: "p6", network: "linkedin", author: "Hannah Okafor", handle: "hannahokafor", role: "Eng Manager, Shopify", body: "Our open house had 300 engineers walk through in one evening. The best part: half of them were students meeting their first tech mentors. This is what a community-led week looks like.", likes: 1530, date: "Jun 4, 2026" },
  { id: "p7", network: "instagram", author: "bymayachen", handle: "bymayachen", body: "badge collection complete ✅ 12 events, 4 days, 0 regrets", image: "badge", likes: 388, date: "Jun 5, 2026" },
  { id: "p8", network: "x", author: "Alex Rivera", handle: "arivera", body: "Flew in from SF for TTW. Leaving with the distinct feeling that Toronto is about to have a very big decade.", likes: 3420, date: "Jun 5, 2026" },
  { id: "p9", network: "linkedin", author: "Jordan Kim", handle: "jordankim", role: "CEO, Parcel AI", body: "Announced our seed round on stage during TTW. Couldn't think of a better place to share it than surrounded by the people who helped us get here. Toronto, thank you.", image: "skyline", likes: 2210, date: "Jun 1, 2026" },
  { id: "p10", network: "x", author: "Nadia Haddad", handle: "nadiahaddad", body: "the volunteer crew at TTW deserve a parade down King St. flawless.", likes: 512, date: "Jun 4, 2026" },
  { id: "p11", network: "instagram", author: "studio.north", handle: "studio.north", body: "Golden hour from our rooftop event. 87 countries in one city this week 🌍", image: "skyline", likes: 1876, date: "Jun 3, 2026" },
  { id: "p12", network: "linkedin", author: "Ethan Brooks", handle: "ethanbrooks", role: "Student, UofT Engineering", body: "As a student, TTW was the first time I felt like the Toronto tech scene was open to me. Landed an internship conversation at a hackathon. Grateful.", likes: 960, date: "Jun 5, 2026" },
];
