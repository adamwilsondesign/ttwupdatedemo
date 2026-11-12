// Shape mirrors the proposed Airtable "Committed Hosts 2027" table.
// `featureOnHomepage` maps to the new "Feature on Homepage" checkbox field —
// the homepage carousel only renders records where it is true, while the
// Partners page renders every Committed record alphabetically.
// DEMO DATA: seeded from the 2026 event partner list.
export type HostRecord = {
  id: string;
  name: string;
  slug: string;
  featureOnHomepage: boolean;
  status: "Committed" | "Pending";
};

export const hosts: HostRecord[] = [
  {
    "id": "rec1password",
    "name": "1Password",
    "slug": "1password",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "rec5to9society",
    "name": "5 to 9 Society",
    "slug": "5-to-9-society",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recaaainigeria",
    "name": "AAAI-Nigeria",
    "slug": "aaai-nigeria",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recacephalt",
    "name": "Acephalt",
    "slug": "acephalt",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recada",
    "name": "Ada",
    "slug": "ada",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recadvite",
    "name": "Advite",
    "slug": "advite",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recaecstack",
    "name": "AEC Stack",
    "slug": "aec-stack",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recairess",
    "name": "Airess",
    "slug": "airess",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recairfairness",
    "name": "Airfairness",
    "slug": "airfairness",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recalan",
    "name": "Alan",
    "slug": "alan",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recallintalks",
    "name": "All In Talks",
    "slug": "all-in-talks",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recambial",
    "name": "Ambial",
    "slug": "ambial",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recanchoramcana",
    "name": "Anchoram Canada",
    "slug": "anchoram-canada",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recantlercanada",
    "name": "Antler Canada",
    "slug": "antler-canada",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recapollo",
    "name": "Apollo",
    "slug": "apollo",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recbdc",
    "name": "BDC",
    "slug": "bdc",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recbell",
    "name": "Bell",
    "slug": "bell",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recbetakit",
    "name": "Betakit",
    "slug": "betakit",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recbizkol",
    "name": "Bizkol",
    "slug": "bizkol",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recblackentrepr",
    "name": "Black Entrepreneurship Alliance",
    "slug": "black-entrepreneurship-alliance",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recboardy",
    "name": "Boardy",
    "slug": "boardy",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recboast",
    "name": "Boast",
    "slug": "boast",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recbrainstation",
    "name": "Brainstation",
    "slug": "brainstation",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recbrazilcanada",
    "name": "Brazil Canada Chamber of Commerce",
    "slug": "brazil-canada-chamber-of-commerce",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recbrightsparkv",
    "name": "Brightspark Ventures",
    "slug": "brightspark-ventures",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recbuildcanada",
    "name": "Build Canada",
    "slug": "build-canada",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccestlawvie",
    "name": "C'est Law Vie",
    "slug": "c-est-law-vie",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccailventures",
    "name": "CAIL Ventures",
    "slug": "cail-ventures",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccanadianlend",
    "name": "Canadian Lenders Association",
    "slug": "canadian-lenders-association",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccanurta",
    "name": "Canurta",
    "slug": "canurta",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccarta",
    "name": "Carta",
    "slug": "carta",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recchatbase",
    "name": "Chatbase",
    "slug": "chatbase",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recchristieossi",
    "name": "Christie Ossington Neighbourhood Centre",
    "slug": "christie-ossington-neighbourhood-centre",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccityoftoront",
    "name": "City of Toronto",
    "slug": "city-of-toronto",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recclarityconte",
    "name": "Clarity Content",
    "slug": "clarity-content",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recclio",
    "name": "Clio",
    "slug": "clio",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recconvictional",
    "name": "Convictional",
    "slug": "convictional",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccouncilofcan",
    "name": "Council of Canadian Innovators",
    "slug": "council-of-canadian-innovators",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccreativedest",
    "name": "Creative Destruction Lab",
    "slug": "creative-destruction-lab",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "reccrestviewstr",
    "name": "Crestview Strategy",
    "slug": "crestview-strategy",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccrosslinkcap",
    "name": "Crosslink Capital",
    "slug": "crosslink-capital",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccsinfocus",
    "name": "CS In Focus",
    "slug": "cs-in-focus",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reccsmc",
    "name": "CSMC",
    "slug": "csmc",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recctm",
    "name": "CTM",
    "slug": "ctm",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recctrlshift",
    "name": "Ctrl Shift",
    "slug": "ctrl-shift",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recdealerai",
    "name": "Dealer AI",
    "slug": "dealer-ai",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recdebowmusical",
    "name": "Debow Musical Instruments",
    "slug": "debow-musical-instruments",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recdeck",
    "name": "Deck",
    "slug": "deck",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recdelo",
    "name": "Delo",
    "slug": "delo",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recdeloitte",
    "name": "Deloitte",
    "slug": "deloitte",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recdeloittevent",
    "name": "Deloitte Ventures",
    "slug": "deloitte-ventures",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recdemoroom",
    "name": "Demo Room",
    "slug": "demo-room",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recdestinationt",
    "name": "Destination Toronto",
    "slug": "destination-toronto",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recdiagramventu",
    "name": "Diagram Ventures",
    "slug": "diagram-ventures",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recdmz",
    "name": "DMZ",
    "slug": "dmz",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recdragonsong",
    "name": "Dragonsong",
    "slug": "dragonsong",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rececomnetwork",
    "name": "Ecom Network",
    "slug": "ecom-network",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recelevate",
    "name": "Elevate",
    "slug": "elevate",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recemploymenthe",
    "name": "Employment Hero",
    "slug": "employment-hero",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recesplanadehea",
    "name": "Esplanade Healthtech Ventures",
    "slug": "esplanade-healthtech-ventures",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recexcellitinc",
    "name": "Excell IT Inc.",
    "slug": "excell-it-inc",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recfacultyofcha",
    "name": "Faculty of Change",
    "slug": "faculty-of-change",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recfleetzero",
    "name": "Fleet Zero",
    "slug": "fleet-zero",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recfloatfinanci",
    "name": "Float Financial",
    "slug": "float-financial",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recflowcapital",
    "name": "Flow Capital",
    "slug": "flow-capital",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recforumventure",
    "name": "Forum Ventures",
    "slug": "forum-ventures",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recfounderathle",
    "name": "Founder Athlete Inc.",
    "slug": "founder-athlete-inc",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recfoundersgap",
    "name": "FoundersGap",
    "slug": "foundersgap",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recfreegeek",
    "name": "Free Geek",
    "slug": "free-geek",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recfruitbloom",
    "name": "Fruitbloom",
    "slug": "fruitbloom",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recfulfil",
    "name": "Fulfil",
    "slug": "fulfil",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recfuturesightv",
    "name": "FutureSight Ventures",
    "slug": "futuresight-ventures",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgandersocial",
    "name": "Gander Social",
    "slug": "gander-social",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgatherly",
    "name": "Gatherly",
    "slug": "gatherly",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgenerationdi",
    "name": "Generation Digital",
    "slug": "generation-digital",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgenesislabs",
    "name": "Genesis Labs",
    "slug": "genesis-labs",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgeorgian",
    "name": "Georgian",
    "slug": "georgian",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recgitcloud",
    "name": "GitCloud",
    "slug": "gitcloud",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recglobalstartu",
    "name": "Global Startups",
    "slug": "global-startups",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgoldenventur",
    "name": "Golden Ventures",
    "slug": "golden-ventures",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recgoodfriends",
    "name": "Good Friends",
    "slug": "good-friends",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgoogleforsta",
    "name": "Google for Startups",
    "slug": "google-for-startups",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgrafanalabs",
    "name": "Grafana Labs",
    "slug": "grafana-labs",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recgrassrootsad",
    "name": "Grassroots Advertising",
    "slug": "grassroots-advertising",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgratefulden",
    "name": "Grateful Den",
    "slug": "grateful-den",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgreenandspie",
    "name": "Green and Spiegel",
    "slug": "green-and-spiegel",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgreycouchcou",
    "name": "Grey Couch Counselling",
    "slug": "grey-couch-counselling",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgryphonsport",
    "name": "Gryphon Sports Management",
    "slug": "gryphon-sports-management",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgsaventures",
    "name": "GSA Ventures",
    "slug": "gsa-ventures",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recgtaa",
    "name": "GTAA",
    "slug": "gtaa",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recherdailyinve",
    "name": "Her Daily Invest",
    "slug": "her-daily-invest",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rechersay",
    "name": "HerSay",
    "slug": "hersay",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rechighlinebeta",
    "name": "Highline Beta",
    "slug": "highline-beta",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "rechonestcreate",
    "name": "Honest Create",
    "slug": "honest-create",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rechorizonlegac",
    "name": "Horizon Legacy",
    "slug": "horizon-legacy",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recibmcanada",
    "name": "IBM Canada",
    "slug": "ibm-canada",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recideogram",
    "name": "Ideogram",
    "slug": "ideogram",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recieeecanada",
    "name": "IEEE Canada",
    "slug": "ieee-canada",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recimaginingfor",
    "name": "Imagining Forward",
    "slug": "imagining-forward",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recimproai",
    "name": "Impro AI",
    "slug": "impro-ai",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recimproving",
    "name": "Improving",
    "slug": "improving",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recinclusifai",
    "name": "InclusifAI",
    "slug": "inclusifai",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recindexexchang",
    "name": "Index Exchange",
    "slug": "index-exchange",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recinnovateyou",
    "name": "Innovate You",
    "slug": "innovate-you",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recinnovobot",
    "name": "Innovobot",
    "slug": "innovobot",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recinoviacapita",
    "name": "Inovia Capital",
    "slug": "inovia-capital",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recinternationa",
    "name": "International Business University Canada",
    "slug": "international-business-university-canada",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recintrepidtrav",
    "name": "Intrepid Travel",
    "slug": "intrepid-travel",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recintuit",
    "name": "Intuit",
    "slug": "intuit",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recjcco",
    "name": "JC + Co",
    "slug": "jc-co",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recjercreativel",
    "name": "JER Creative Lab",
    "slug": "jer-creative-lab",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recjoin",
    "name": "Join",
    "slug": "join",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recjuniorjonesg",
    "name": "Junior Jones Group",
    "slug": "junior-jones-group",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reckickoff",
    "name": "Kickoff",
    "slug": "kickoff",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recknightcapche",
    "name": "Knightcap Chess Club",
    "slug": "knightcap-chess-club",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reckraftgeneaii",
    "name": "KraftGene AI Inc.",
    "slug": "kraftgene-ai-inc",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reclandtoinnova",
    "name": "Land to Innovate",
    "slug": "land-to-innovate",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recleadershippi",
    "name": "Leadership Pipeline Institute",
    "slug": "leadership-pipeline-institute",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reclevelupsocie",
    "name": "LevelUp Society",
    "slug": "levelup-society",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reclexiden",
    "name": "Lexiden",
    "slug": "lexiden",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reclinkloop",
    "name": "LinkLoop",
    "slug": "linkloop",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reclinkusgroup",
    "name": "Linkus Group",
    "slug": "linkus-group",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recloi",
    "name": "LOI",
    "slug": "loi",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recloopfinancia",
    "name": "Loop Financial",
    "slug": "loop-financial",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reclovable",
    "name": "Lovable",
    "slug": "lovable",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "reclyft",
    "name": "Lyft",
    "slug": "lyft",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recmakerslounge",
    "name": "Makers Lounge",
    "slug": "makers-lounge",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recmapleleafven",
    "name": "Maple Leaf Venture Club",
    "slug": "maple-leaf-venture-club",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recmapleviewene",
    "name": "Mapleview Energy",
    "slug": "mapleview-energy",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recmars",
    "name": "MaRS",
    "slug": "mars",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recmarsinvestme",
    "name": "MaRS Investment Accelerator Fund",
    "slug": "mars-investment-accelerator-fund",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recmeraki",
    "name": "Meraki",
    "slug": "meraki",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recmiro",
    "name": "Miro",
    "slug": "miro",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recmobilesyrup",
    "name": "Mobile Syrup",
    "slug": "mobile-syrup",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recmondaygirl",
    "name": "Monday Girl",
    "slug": "monday-girl",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recmyabode",
    "name": "MyAbode",
    "slug": "myabode",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recnappr",
    "name": "Nappr",
    "slug": "nappr",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recndr",
    "name": "NDR",
    "slug": "ndr",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recneuronicwork",
    "name": "NeuronicWorks Inc.",
    "slug": "neuronicworks-inc",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recnextcanada",
    "name": "Next Canada",
    "slug": "next-canada",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recnorthexitven",
    "name": "North Exit Ventures",
    "slug": "north-exit-ventures",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recnovaforge",
    "name": "Novaforge",
    "slug": "novaforge",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recnpdigital",
    "name": "NP Digital",
    "slug": "np-digital",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recomersventure",
    "name": "OMERS Ventures",
    "slug": "omers-ventures",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "reconeeleven",
    "name": "One Eleven",
    "slug": "one-eleven",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recopener",
    "name": "Opener",
    "slug": "opener",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recosler",
    "name": "Osler",
    "slug": "osler",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recpartyra",
    "name": "Partyra",
    "slug": "partyra",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recpenderventur",
    "name": "Pender Ventures",
    "slug": "pender-ventures",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recpeoplebright",
    "name": "People Bright Consulting Inc",
    "slug": "people-bright-consulting-inc",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recphoenixhealt",
    "name": "Phoenix Health Inc",
    "slug": "phoenix-health-inc",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recpitchpilot",
    "name": "PitchPilot",
    "slug": "pitchpilot",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recpluto",
    "name": "Pluto",
    "slug": "pluto",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recpolaritylabs",
    "name": "Polarity Labs",
    "slug": "polarity-labs",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recporch",
    "name": "Porch",
    "slug": "porch",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recportageventu",
    "name": "Portage Ventures",
    "slug": "portage-ventures",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recpraktikai",
    "name": "PraktikAI",
    "slug": "praktikai",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recprosperalabs",
    "name": "ProsperaLabs Inc.",
    "slug": "prosperalabs-inc",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recpursuits",
    "name": "Pursuits",
    "slug": "pursuits",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recpwccanada",
    "name": "PwC Canada",
    "slug": "pwc-canada",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recqsla",
    "name": "QSLA",
    "slug": "qsla",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recrbcx",
    "name": "RBCx",
    "slug": "rbcx",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recrework",
    "name": "Re-work",
    "slug": "re-work",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recredesignheal",
    "name": "Redesign Health",
    "slug": "redesign-health",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recrethinkretai",
    "name": "Rethink Retail",
    "slug": "rethink-retail",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recrhino",
    "name": "Rhino",
    "slug": "rhino",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recrippleventur",
    "name": "Ripple Ventures",
    "slug": "ripple-ventures",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recrobinhood",
    "name": "Robinhood",
    "slug": "robinhood",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recrogerscybers",
    "name": "Rogers Cybersecure Catalyst",
    "slug": "rogers-cybersecure-catalyst",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recrootly",
    "name": "Rootly",
    "slug": "rootly",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recround13capit",
    "name": "Round13 Capital",
    "slug": "round13-capital",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recsagard",
    "name": "Sagard",
    "slug": "sagard",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recsagomini",
    "name": "Sago Mini",
    "slug": "sago-mini",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recsaltxc",
    "name": "Salt XC",
    "slug": "salt-xc",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recsamaracentre",
    "name": "Samara Centre for Democracy",
    "slug": "samara-centre-for-democracy",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recscalewithout",
    "name": "Scale Without Borders",
    "slug": "scale-without-borders",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recscalpelsands",
    "name": "Scalpels and Spreadsheets",
    "slug": "scalpels-and-spreadsheets",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recschulichstar",
    "name": "Schulich Startups",
    "slug": "schulich-startups",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recscouty",
    "name": "Scouty",
    "slug": "scouty",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recselflearners",
    "name": "Self Learners",
    "slug": "self-learners",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recshopify",
    "name": "Shopify",
    "slug": "shopify",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recshopifyventu",
    "name": "Shopify Ventures",
    "slug": "shopify-ventures",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recsmartandbigg",
    "name": "Smart & Biggar",
    "slug": "smart-and-biggar",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recsocratesadvi",
    "name": "Socrates Advice",
    "slug": "socrates-advice",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recsomoslatinxi",
    "name": "Somos Latinx In Tech",
    "slug": "somos-latinx-in-tech",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recspotify",
    "name": "Spotify",
    "slug": "spotify",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recstan",
    "name": "Stan",
    "slug": "stan",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recstartupecosy",
    "name": "Startup Ecosystem Canada",
    "slug": "startup-ecosystem-canada",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recstartupgrind",
    "name": "Startup Grind Toronto",
    "slug": "startup-grind-toronto",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recstartupsweat",
    "name": "Startup Sweats",
    "slug": "startup-sweats",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recstartwell",
    "name": "Startwell",
    "slug": "startwell",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recsunday",
    "name": "Sunday",
    "slug": "sunday",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectailscale",
    "name": "Tailscale",
    "slug": "tailscale",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "rectalktomedi",
    "name": "Talk to Medi",
    "slug": "talk-to-medi",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectbdc",
    "name": "TBDC",
    "slug": "tbdc",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectechto",
    "name": "TechTO",
    "slug": "techto",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectelebotics",
    "name": "Telebotics",
    "slug": "telebotics",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectetradigital",
    "name": "Tetra Digital Group",
    "slug": "tetra-digital-group",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectheagenticsf",
    "name": "The Agentics Foundation",
    "slug": "the-agentics-foundation",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectheaicollect",
    "name": "The AI Collective",
    "slug": "the-ai-collective",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recthecanadianw",
    "name": "The Canadian Women's Chamber of Commerce",
    "slug": "the-canadian-women-s-chamber-of-commerce",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recthecansbridg",
    "name": "The Cansbridge Fellowship",
    "slug": "the-cansbridge-fellowship",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recthechangelea",
    "name": "The Change Leadership",
    "slug": "the-change-leadership",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recthefuturebri",
    "name": "The Future Brief",
    "slug": "the-future-brief",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recthehiracolle",
    "name": "The Hira Collective",
    "slug": "the-hira-collective",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectheicebreake",
    "name": "The Icebreaker",
    "slug": "the-icebreaker",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recthesyndicate",
    "name": "The Syndicate",
    "slug": "the-syndicate",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recthetorontoll",
    "name": "The Toronto LLM Meetup Group",
    "slug": "the-toronto-llm-meetup-group",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectimiacapital",
    "name": "Timia Capital",
    "slug": "timia-capital",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectorontodao",
    "name": "Toronto DAO",
    "slug": "toronto-dao",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectorontogloba",
    "name": "Toronto Global",
    "slug": "toronto-global",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "rectorontoprodu",
    "name": "Toronto Product Management Association",
    "slug": "toronto-product-management-association",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectorontoregio",
    "name": "Toronto Region Board of Trade",
    "slug": "toronto-region-board-of-trade",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectorontotechf",
    "name": "Toronto Tech Fest",
    "slug": "toronto-tech-fest",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectraveltrends",
    "name": "Travel Trends Podcast",
    "slug": "travel-trends-podcast",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectrealt",
    "name": "Trealt",
    "slug": "trealt",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectribalscale",
    "name": "TribalScale",
    "slug": "tribalscale",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectrndzy",
    "name": "Trndzy",
    "slug": "trndzy",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectrove",
    "name": "Trove",
    "slug": "trove",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectruenorthcto",
    "name": "TrueNorthCTO",
    "slug": "truenorthcto",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectuttivacatio",
    "name": "Tutti Vacation",
    "slug": "tutti-vacation",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "rectwosmallfish",
    "name": "Two Small Fish",
    "slug": "two-small-fish",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "rectwostepsforw",
    "name": "Two Steps Forward",
    "slug": "two-steps-forward",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recummah",
    "name": "Ummah",
    "slug": "ummah",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recunboundideas",
    "name": "Unbound Ideas",
    "slug": "unbound-ideas",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recuniblock",
    "name": "Uniblock",
    "slug": "uniblock",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recuniversityof",
    "name": "University of Toronto",
    "slug": "university-of-toronto",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recvalery",
    "name": "Valery",
    "slug": "valery",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recvclub",
    "name": "vClub",
    "slug": "vclub",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recvectorinstit",
    "name": "Vector Institute",
    "slug": "vector-institute",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recvelocity",
    "name": "Velocity",
    "slug": "velocity",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recvenn",
    "name": "Venn",
    "slug": "venn",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recvibecodingco",
    "name": "Vibe Coding Colosseum",
    "slug": "vibe-coding-colosseum",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recvirio",
    "name": "Virio",
    "slug": "virio",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recvoiceflow",
    "name": "Voiceflow",
    "slug": "voiceflow",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recwaterloovent",
    "name": "Waterloo Venture Group",
    "slug": "waterloo-venture-group",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recwattpad",
    "name": "Wattpad",
    "slug": "wattpad",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recwhitestarcap",
    "name": "White Star Capital",
    "slug": "white-star-capital",
    "featureOnHomepage": true,
    "status": "Committed"
  },
  {
    "id": "recworldwiderob",
    "name": "Worldwide Robotics Hub",
    "slug": "worldwide-robotics-hub",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "recyspaceatyork",
    "name": "YSpace at York U",
    "slug": "yspace-at-york-u",
    "featureOnHomepage": false,
    "status": "Committed"
  },
  {
    "id": "reczerotoonestr",
    "name": "Zero to One Strategic",
    "slug": "zero-to-one-strategic",
    "featureOnHomepage": false,
    "status": "Committed"
  }
];
