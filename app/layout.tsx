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
      className="pt-24 pb-20 px-6 sm:px-12 md:px-16 overflow-hidden relative border-t-4 border-[#D7263D] bg-[#001217]"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Premium Halftone Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D7263D 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-stretch text-left">
        
        {/* EDITORIAL HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-[var(--font-bungee)] text-white tracking-[0.2em] select-none">
            AFTERWORD
          </h2>
          <p className="text-lg sm:text-xl font-[var(--font-marker)] text-[#D7263D] tracking-[0.3em] uppercase mt-2">
            FROM THE CREATOR
          </p>
          
          <div className="w-24 h-[3px] bg-[#D7263D] mx-auto mt-6" />
          
          <div className="max-w-xl mx-auto mt-8 font-[var(--font-marker)] text-gray-400 text-base sm:text-lg leading-relaxed tracking-wider italic text-center">
            <span className="text-white font-serif">“</span> Algunas historias arrancan con un personaje. Otras con una pregunta. <strong className="text-white font-bold">The Boyz</strong> arrancó con las dos. <span className="text-white font-serif">”</span>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div className="w-full flex flex-col gap-[3px] my-10 opacity-40">
          <div className="w-full h-[2px] bg-white" />
          <div className="w-full h-[0.5px] bg-white" />
        </div>

        {/* CARTA DEL AUTOR */}
        <div className="flex flex-col gap-6 text-gray-300 text-[15px] sm:text-base leading-8 font-sans">
          <p>
            Hace años que vengo craneando un universo donde el humor absurdo conviva con conspiraciones, ciencia ficción, personajes rotos y misterios que se van revelando de a poco. No quería escribir una historia que muera al cerrar la pestaña; la idea siempre fue armar un mundo que siga creciendo incluso cuando termines de leer.
          </p>
        </div>

        {/* SECTION DIVIDER */}
        <div className="w-full flex flex-col gap-[3px] my-10 opacity-20">
          <div className="w-full h-[0.5px] bg-white" />
        </div>

        {/* SECCION NARRATIVA */}
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8 my-4">
          <h3 className="font-[var(--font-bungee)] text-sm tracking-widest text-[#D7263D] uppercase pt-1">
            NARRATIVA
          </h3>
          <div className="flex flex-col gap-6 text-gray-400 text-[14px] sm:text-[15px] leading-7">
            <p>
              De <strong className="text-white">Jonathan Hickman</strong> (<span className="italic text-gray-300">House of X / Powers of X</span>, <span className="italic text-gray-300">East of West</span>) me obsesionó cómo arma universos gigantes sin perder de vista a sus personajes y plantando pistas que cobran sentido cientos de páginas después. De <strong className="text-white">Kevin Feige</strong> tomé esa locura por la continuidad y el detalle escondido, y de <strong className="text-white">James Gunn</strong> aprendí que, entre tanta explosión y delirio, la historia sí o sí necesita tener corazón.
            </p>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div className="w-full flex flex-col gap-[3px] my-10 opacity-20">
          <div className="w-full h-[0.5px] bg-white" />
        </div>

        {/* SECCION ARTE */}
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8 my-4">
          <h3 className="font-[var(--font-bungee)] text-sm tracking-widest text-[#D7263D] uppercase pt-1">
            DIRECCIÓN ARTÍSTICA
          </h3>
          <div className="flex flex-col gap-6 text-gray-400 text-[14px] sm:text-[15px] leading-7">
            <p>
              El objetivo visual no es calcar a nadie, sino exprimir lo mejor de mis referentes para encontrar una identidad propia: de <strong className="text-white">Sara Pichelli</strong> (<span className="italic text-gray-300">Ultimate Spider-Man</span>) aprendí a darle movimiento a la página; de <strong className="text-white">Jorge Jiménez</strong> (<span className="italic text-gray-300">Batman</span>, <span className="italic text-gray-300">Super Sons</span>) a guiar los ojos del lector en la viñeta; de <strong className="text-white">Greg Capullo</strong> (<span className="italic text-gray-300">Spawn</span>, <span className="italic text-gray-300">Court of Owls</span>) a amar el contraste y el claroscuro; y de <strong className="text-white">Lee Garbett</strong> (<span className="italic text-gray-300">Loki: Agent of Asgard</span>) a entender que la elegancia suele estar en lo simple.
            </p>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div className="w-full flex flex-col gap-[3px] my-10 opacity-20">
          <div className="w-full h-[0.5px] bg-white" />
        </div>

        {/* SECCION PROCESO */}
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8 my-4">
          <h3 className="font-[var(--font-bungee)] text-sm tracking-widest text-[#D7263D] uppercase pt-1">
            EL PROCESO
          </h3>
          <div className="flex flex-col gap-6 text-gray-400 text-[14px] sm:text-[15px] leading-7">
            <p>
              Cada página arranca con un guion tradicional y pasa por storyboard, dirección de arte y composición antes del render visual. La IA es una herramienta de producción, jamás un reemplazo creativo. De hecho, programé mi propio editor web para meter a mano cada globo de diálogo, efecto de sonido y animación, asegurándome de que la lectura fluya de manera orgánica.
            </p>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div className="w-full flex flex-col gap-[3px] my-10 opacity-40">
          <div className="w-full h-[2px] bg-white" />
          <div className="w-full h-[0.5px] bg-white" />
        </div>

        {/* FIRMA Y AGRADECIMIENTO */}
        <div className="text-center my-12 flex flex-col items-center gap-4">
          <p className="font-[var(--font-marker)] text-2xl text-white tracking-wide">
            Espero que lo disfrutes.
          </p>
          
          <div className="flex flex-col items-center mt-6">
            <a
              href="https://ian-pontorno-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-luckiest)] text-3xl text-white tracking-widest uppercase hover:scale-105 transition-transform hover:text-[#D7263D] block select-none"
            >
              IAN PONTORNO
            </a>
            <span className="text-xs text-[#D7263D] font-[var(--font-bangers)] tracking-[0.25em] uppercase mt-1">
              Creador de The Boyz
            </span>
          </div>
        </div>

        {/* COPYRIGHT & LEGAL DISCLAIMER */}
        <div className="w-full border-t border-white/5 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] tracking-wider text-gray-600 uppercase font-sans">
          <p>
            © {new Date().getFullYear()} The Boyz Comics. Todos los derechos reservados.
          </p>
          <p className="italic text-gray-500 text-center sm:text-right max-w-sm leading-relaxed">
            * Cualquier similitud con la realidad de los personajes es pura coincidencia. Esta es una obra de ficción. *
          </p>
        </div>

      </div>
    </footer>
  );
}


