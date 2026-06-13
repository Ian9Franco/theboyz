import type { Metadata } from "next";
import { Inter, Bangers, Permanent_Marker, Bungee, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter   = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bangers = Bangers({ weight: "400", variable: "--font-bangers", subsets: ["latin"] });
const marker  = Permanent_Marker({ weight: "400", variable: "--font-marker", subsets: ["latin"] });
const bungee  = Bungee({ weight: "400", variable: "--font-bungee", subsets: ["latin"] });
const luckiest = Luckiest_Guy({ weight: "400", variable: "--font-luckiest", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Boyz | Cómic",
  description: "Leete la saga del Camión Verde y el Mativerso — un cómic original.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" suppressHydrationWarning className={`${inter.variable} ${bangers.variable} ${marker.variable} ${bungee.variable} ${luckiest.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-light-popart" suppressHydrationWarning>
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
      style={{ background: "#f1f5f9", borderTop: "3px solid #1b4332" }}
    >
      {/* Halftone bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, #0f2042 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center gap-6">
        <div className="relative w-60 h-16 sm:w-72 sm:h-20 max-w-full overflow-hidden rounded-xl shadow-sm border border-[#0f2042]/10 bg-white">
          <img
            src="/logo_white.jpg"
            alt="The Boyz Logo"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
        <p
          className="font-[var(--font-marker)] text-lg"
          style={{ color: "#0f2042", opacity: 0.8 }}
        >
          Pronto caen más capítulos — dale que llueve
        </p>
        
        {/* Comic-style badge */}
        <div className="my-2">
          <span
            className="font-[var(--font-bangers)] text-xs sm:text-sm tracking-[0.35em] uppercase"
            style={{
              color: "#1b4332",
              border: "2px solid #1b4332",
              padding: "0.4rem 1.25rem",
              background: "white",
              boxShadow: "3px 3px 0 #1b4332",
              display: "inline-block",
              borderRadius: "4px",
            }}
          >
            Un cómic original
          </span>
        </div>

        <div className="flex flex-col gap-4 text-center max-w-2xl mt-4">
          <p className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed">
            Este proyecto surge de mi imaginación y de un flujo de trabajo que armé paso a paso: empiezo con un guion en crudo, divido la narrativa y diseño la dirección artística. El apartado visual lo normalizo con IA bajo mi total supervisión, inspirándome hoy en el talento de <strong>Sara Pichelli</strong> y <strong>Jorge Jiménez</strong>, y apuntando a futuro hacia la fuerza de <strong>Greg Capullo</strong> y <strong>Lee Garbett</strong>. Al final, todo se vuelve un tranbajo a mano: programé mi propio editor integrado para colocar meticulosamente cada globo de texto y efecto de sonido, logrando que la historia se sienta natural y orgánica mediante animaciones suaves y caracteristicas qol.
          </p>
        </div>

        <div
          className="w-24 h-px"
          style={{ background: "rgba(15,32,66,0.15)" }}
        />
        <p
          className="font-[var(--font-bangers)] text-sm tracking-[0.2em]"
          style={{ color: "#0f2042", opacity: 0.6 }}
        >
          © {new Date().getFullYear()} THE BOYZ COMICS — CREADO POR{" "}
          <a
            href="https://ian-pontorno-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1b4332] underline transition-colors font-bold"
            style={{ color: "#0f2042" }}
          >
            IAN PONTORNO
          </a>
        </p>
      </div>
    </footer>
  );
}
