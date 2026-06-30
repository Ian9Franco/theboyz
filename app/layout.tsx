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
      style={{ background: "#001419", borderTop: "4px solid #D7263D" }}
    >
      {/* Premium Halftone pop-art dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #D7263D 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center gap-6">
        <div className="relative w-60 h-16 sm:w-72 sm:h-20 max-w-full overflow-hidden rounded-xl shadow-[0_0_20px_rgba(27,67,50,0.2)] border border-white/10 bg-[#001419]">
          <img
            src="/logo_white.webp"
            alt="The Boyz Logo"
            className="w-full h-full object-contain rounded-xl p-2"
          />
        </div>
        <p
          className="font-[var(--font-marker)] text-lg tracking-wider"
          style={{ color: "#D7263D", textShadow: "2px 2px 0 rgba(0,0,0,0.8)" }}
        >
          Pronto caen más capítulos — dale que llueve
        </p>
        
        {/* Comic-style badge */}
        <div className="my-2">
          <span
            className="font-[var(--font-bangers)] text-xs sm:text-sm tracking-[0.35em] uppercase"
            style={{
              color: "#D7263D",
              border: "2px solid #D7263D",
              padding: "0.5rem 1.5rem",
              background: "#001419",
              boxShadow: "3px 3px 0 #D7263D",
              display: "inline-block",
              borderRadius: "4px",
            }}
          >
            Un cómic original
          </span>
        </div>

        <div className="flex flex-col gap-4 text-center max-w-2xl mt-4">
          <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
            Este proyecto surge de mi imaginación y de un flujo de trabajo que armé paso a paso: empiezo con un guion en crudo, divido la narrativa y diseño la dirección artística. El apartado visual lo normalizo con IA bajo mi total supervisión, inspirándome hoy en el talento de <strong className="text-white">Sara Pichelli</strong> y <strong className="text-white">Jorge Jiménez</strong>, y apuntando a futuro hacia la fuerza de <strong className="text-white">Greg Capullo</strong> y <strong className="text-white">Lee Garbett</strong>. Al final, todo se vuelve un trabajo a mano: programé mi propio editor integrado para colocar meticulosamente cada globo de texto y efecto de sonido, logrando que la historia se sienta natural y orgánica mediante animaciones suaves y características QoL.
          </p>
        </div>

        <div
          className="w-24 h-px my-4"
          style={{ background: "rgba(15,27,61,0.3)" }}
        />
        <p
          className="font-[var(--font-bangers)] text-sm tracking-[0.2em] text-gray-500"
        >
          © {new Date().getFullYear()} THE BOYZ COMICS — CREADO POR{" "}
          <a
            href="https://ian-pontorno-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D7263D] underline transition-colors font-bold text-gray-400"
          >
            IAN PONTORNO
          </a>
        </p>
      </div>
    </footer>
  );
}


