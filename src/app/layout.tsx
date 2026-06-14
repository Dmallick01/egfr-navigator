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
  title: "EGFR Resistance Navigator",
  description:
    "Explore how EGFR mutations in lung cancer determine drug response and drive resistance — from gefitinib to PROTAC protein degraders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ background: "var(--bg)" }}>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
        <Navigation />
        <main>{children}</main>
        <footer style={{
          borderTop: "1px solid var(--border)",
          padding: "34px 24px",
          marginTop: "89px",
          textAlign: "center",
          color: "var(--text-3)",
          fontSize: "12px",
          lineHeight: "1.7",
          fontFamily: "var(--font-body)",
          background: "rgba(4,12,32,0.60)",
        }}>
          <p style={{ marginBottom: 8 }}>
            For research and educational purposes only — not for clinical decision-making.
          </p>
          <p>
            Data: ClinicalTrials.gov · PubMed · ChEMBL (CC BY-SA) · ClinVar · gnomAD · cBioPortal · Open Targets ·{" "}
            AlphaMissense (CC BY-NC-SA 4.0, Google DeepMind)
          </p>
        </footer>
      </body>
    </html>
  );
}
