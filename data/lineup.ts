// PLACEHOLDER lineup for the pre-conference homepage. Replace with the real
// speaker and event data (Airtable / Luma) once announced. Names and companies
// below are fictional; headshots are stock placeholders.
export type Speaker = { name: string; title: string; company: string; topic: string; photo: string };
export type TTWEvent = {
  id: string; day: number; time: string; title: string; host: string;
  venue: string; area: string; tag: "Flagship" | "Panel" | "Social" | "Workshop" | "Demo Day" | "Hackathon" | "Dinner";
  capacity: string;
};

export const days = [
  { n: 0, label: "Mon", date: "May 31" },
  { n: 1, label: "Tue", date: "Jun 1" },
  { n: 2, label: "Wed", date: "Jun 2" },
  { n: 3, label: "Thu", date: "Jun 3" },
  { n: 4, label: "Fri", date: "Jun 4" },
];

export const speakers: Speaker[] = [
  { name: "Amara Okonkwo", title: "Founder & CEO", company: "Northwind AI", topic: "Building frontier AI from Canada", photo: "/people/p32.jpg" },
  { name: "Daniel Reyes", title: "General Partner", company: "Lakeshore Ventures", topic: "The next decade of Canadian venture", photo: "/people/p12.jpg" },
  { name: "Mei Tanaka", title: "VP Engineering", company: "Harbourfront Labs", topic: "Scaling eng teams 10 → 500", photo: "/people/p5.jpg" },
  { name: "Liam O'Connor", title: "Co-founder", company: "Parcel Robotics", topic: "Hardware is hard (and worth it)", photo: "/people/p56.jpg" },
  { name: "Priya Shah", title: "Chief Product Officer", company: "Maplestack", topic: "Product taste in the age of agents", photo: "/people/p47.jpg" },
  { name: "Jonah Feld", title: "Head of Platform", company: "Union Pay Co.", topic: "Fintech infrastructure at scale", photo: "/people/p68.jpg" },
  { name: "Sofia Alvarez", title: "Founder", company: "Kindred Health", topic: "Healthtech that clinicians love", photo: "/people/p26.jpg" },
  { name: "Kwame Mensah", title: "Director of AI Research", company: "Vector Lab", topic: "Open research, real products", photo: "/people/p64.jpg" },
  { name: "Hannah Lindqvist", title: "Partner", company: "Northbound Capital", topic: "What investors want in 2027", photo: "/people/p44.jpg" },
  { name: "Marcus Bell", title: "Founder & CEO", company: "Gridline Energy", topic: "Climate tech, Canadian scale", photo: "/people/p57.jpg" },
];

export const events: TTWEvent[] = [
  { id: "e1", day: 0, time: "08:00", title: "Opening Breakfast: State of Toronto Tech", host: "TTW", venue: "Union Station", area: "Downtown", tag: "Flagship", capacity: "800" },
  { id: "e2", day: 0, time: "12:30", title: "Founders & Funders Lunch", host: "Lakeshore Ventures", venue: "The Westin Harbour Castle", area: "Waterfront", tag: "Dinner", capacity: "120" },
  { id: "e3", day: 0, time: "16:00", title: "AI Builders Demo Afternoon", host: "Northwind AI", venue: "MaRS Discovery District", area: "Discovery District", tag: "Demo Day", capacity: "300" },
  { id: "e4", day: 0, time: "19:00", title: "King West Kickoff Party", host: "Community", venue: "Spadina & King", area: "King West", tag: "Social", capacity: "600" },
  { id: "e5", day: 1, time: "09:00", title: "Product Leaders Roundtable", host: "Maplestack", venue: "Liberty Village Hub", area: "Liberty Village", tag: "Panel", capacity: "60" },
  { id: "e6", day: 1, time: "13:00", title: "Climate Tech Showcase", host: "Greenline Collective", venue: "Evergreen Brick Works", area: "Don Valley", tag: "Demo Day", capacity: "250" },
  { id: "e7", day: 1, time: "18:30", title: "Women in Tech Dinner", host: "Harbourfront Labs", venue: "Distillery District", area: "Distillery", tag: "Dinner", capacity: "80" },
  { id: "e8", day: 2, time: "10:00", title: "Fintech Infrastructure Summit", host: "Union Pay Co.", venue: "First Canadian Place", area: "Financial District", tag: "Panel", capacity: "400" },
  { id: "e9", day: 2, time: "14:00", title: "Design Systems Workshop", host: "Studio North", venue: "Queen West Studio", area: "Queen West", tag: "Workshop", capacity: "40" },
  { id: "e10", day: 2, time: "20:00", title: "Rooftop Founders Social", host: "Community", venue: "Rooftop at The Thompson", area: "King West", tag: "Social", capacity: "300" },
  { id: "e11", day: 3, time: "09:30", title: "Healthtech Breakfast", host: "Kindred Health", venue: "Discovery District", area: "Discovery District", tag: "Panel", capacity: "90" },
  { id: "e12", day: 3, time: "13:00", title: "24h Student Hackathon kicks off", host: "UofT + Waterloo", venue: "Myhal Centre", area: "UofT", tag: "Hackathon", capacity: "400" },
  { id: "e13", day: 3, time: "18:00", title: "Robotics Open House", host: "Parcel Robotics", venue: "Junction Triangle", area: "The Junction", tag: "Demo Day", capacity: "200" },
  { id: "e14", day: 4, time: "11:00", title: "Hackathon Finals & Demos", host: "UofT + Waterloo", venue: "Myhal Centre", area: "UofT", tag: "Hackathon", capacity: "500" },
  { id: "e15", day: 4, time: "15:00", title: "VC Office Hours Marathon", host: "Lakeshore Ventures", venue: "ONE ELEVEN", area: "Downtown", tag: "Workshop", capacity: "150" },
  { id: "e16", day: 4, time: "19:00", title: "Homecoming", host: "TTW", venue: "History", area: "Leslieville", tag: "Flagship", capacity: "1,200" },
];
