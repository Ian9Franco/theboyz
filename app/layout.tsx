import type { Metadata } from "next";
import { Inter, Bangers, Permanent_Marker, Bungee } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter   = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bangers = Bangers({ weight: "400", variable: "--font-bangers", subsets: ["latin"] });
const marker  = Permanent_Marker({ weight: "400", variable: "--font-marker", subsets: ["latin"] });
const bungee  = Bungee({ weight: "400", variable: "--font-bungee", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Boyz | Cómic",
  description: "Leete la saga del Camión Verde y el Mativerso — un cómic original.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${bangers.variable} ${marker.variable} ${bungee.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans" style={{ background: "#f4f0e6" }}>
        <NavBar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer
      className="pt-16 pb-10 px-6 overflow-hidden relative"
      style={{ background: "#0a0a0f", borderTop: "3px solid #e8185a" }}
    >
      {/* Halftone bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center gap-6">
        <div
          className="font-[var(--font-bangers)] text-5xl sm:text-7xl text-white tracking-widest"
          style={{ textShadow: "4px 4px 0 #e8185a" }}
        >
          …
        </div>
        <p
          className="font-[var(--font-marker)] text-lg"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Pronto caen más capítulos — dale que llueve
        </p>
        
        {/* Comic-style badge */}
        <div className="my-2">
          <span
            className="font-[var(--font-bangers)] text-xs sm:text-sm tracking-[0.35em] uppercase"
            style={{
              color: "#e8185a",
              border: "1px solid rgba(232,24,90,0.45)",
              padding: "0.4rem 1.25rem",
              background: "rgba(10, 10, 15, 0.9)",
              boxShadow: "3px 3px 0 rgba(232, 24, 90, 0.3)",
              display: "inline-block",
            }}
          >
            Un cómic original
          </span>
        </div>

        <div
          className="w-24 h-px"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
        <p
          className="font-[var(--font-bangers)] text-sm tracking-[0.2em]"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          © {new Date().getFullYear()} THE BOYZ COMICS — CREADO POR{" "}
          <a
            href="https://ian-pontorno-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f5e642] underline transition-colors"
          >
            IAN PONTORNO
          </a>
        </p>
      </div>
    </footer>
  );
}
