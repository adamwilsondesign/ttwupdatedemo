import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageFx } from "@/components/PageFx";

export const metadata: Metadata = {
  title: "Toronto Tech Week 2027 · May 31 – June 4",
  description: "A weeklong, citywide collection of community-hosted events celebrating the builders of Toronto tech. Host an event at TTW 2027.",
};
export const viewport: Viewport = { themeColor: "#05060f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-tone="dark">
      <head>
        <link rel="preload" href="/fonts/volksans-Regular.otf" as="font" type="font/otf" crossOrigin="" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <PageFx />
      </body>
    </html>
  );
}
