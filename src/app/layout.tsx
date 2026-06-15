import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Dibakar Mallick — EGFR Navigator",
  description:
    "Portfolio of Dibakar Mallick — undergraduate researcher building EGFR Navigator, an interactive reference for EGFR mutations, resistance, and PROTAC degraders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ background: "var(--bg)" }}>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
        <Navigation />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="site-footer-inner">
            <p className="site-footer-disclaimer">
              For research and educational purposes only — not for clinical decision-making.
            </p>
            <p className="site-footer-meta">
              Built by{" "}
              <a href="/about" className="site-footer-link">Dibakar Mallick</a>
              {" · "}
              <a href="https://github.com/Dmallick01/egfr-navigator" target="_blank" rel="noopener noreferrer" className="site-footer-link">
                Source
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
